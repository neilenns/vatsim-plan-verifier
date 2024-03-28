import { useCallback, useMemo } from "react";
import { useImmer } from "use-immer";
import { IVatsimFlightPlan, ImportState } from "../interfaces/IVatsimFlightPlan.mts";

export function useVatsim() {
  const [flightPlans, setFlightPlans] = useImmer<IVatsimFlightPlan[]>([]);
  const [hasUpdates, setHasUpdates] = useImmer<boolean>(false);
  const [hasNew, setHasNew] = useImmer<boolean>(false);

  const processFlightPlans = useCallback(
    (incomingPlans: IVatsimFlightPlan[], sortByCreatedAt: boolean) => {
      // If there are no incoming plans then just set an empty array.
      if (incomingPlans.length === 0) {
        setFlightPlans(() => {
          return [];
        });

        return {
          hasNew: false,
          hasUpdates: false,
        };
      }

      // Filter out all the deleted flight plans. They'll be the ones
      // that don't exist in the incoming list.
      setFlightPlans((draft) => {
        return draft.filter((existing) =>
          incomingPlans.find((incoming) => incoming._id === existing._id)
        );
      });

      // Loop through all the incoming plans and see if it needs to be added or an existing
      // entry updated.
      incomingPlans.forEach((incoming) => {
        setFlightPlans((draft) => {
          const existing = draft.find((plan) => plan._id === incoming._id);

          // It's a new plan
          if (!existing) {
            draft.push({
              ...incoming,
              createdAt: new Date(incoming.createdAt),
              updatedAt: new Date(incoming.updatedAt),
              importState: ImportState.NEW,
            } as IVatsimFlightPlan);
            setHasNew(true);
          }
          // It's an existing one so update it
          else {
            const updated = incoming.flightPlanRevision !== existing.flightPlanRevision;

            // This uses an if statement instead of the previous shorthand hasUpdates || updates
            // to avoid hasUpdates being a dependency of the callback, which was preventing
            // udpates from causing a sound to play.
            if (updated) {
              setHasUpdates(true);
            }

            // Update the properties. departureTime is not included in this list since it doesn't
            // matter for plan verification.
            existing.arrival = incoming.arrival;
            existing.callsign = incoming.callsign;
            existing.departure = incoming.departure;
            existing.departureTime = incoming.departureTime;
            existing.importState = updated ? ImportState.UPDATED : existing.importState;
            existing.isCoasting = incoming.isCoasting;
            existing.isPrefile = incoming.isPrefile;
            existing.flightPlanRevision = incoming.flightPlanRevision;
            existing.createdAt = new Date(incoming.createdAt);
            existing.updatedAt = new Date(incoming.updatedAt);
          }
        });
      });

      if (sortByCreatedAt) {
        setFlightPlans((draft) =>
          draft.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        );
      } else {
        setFlightPlans((draft) => draft.sort((a, b) => a.callsign.localeCompare(b.callsign)));
      }
    },
    [setFlightPlans, setHasNew, setHasUpdates]
  );

  // Finds the callsign in the list of current plans, sets its
  // state to imported.
  const markPlanImported = useCallback(
    (callsign: string) => {
      setFlightPlans((draft) => {
        const plan = draft.find((plan) => plan.callsign === callsign);
        if (!plan) {
          return;
        }

        plan.importState = ImportState.IMPORTED;
      });
    },
    [setFlightPlans]
  );

  return useMemo(
    () => ({
      flightPlans,
      setFlightPlans,
      processFlightPlans,
      markPlanImported,
      hasUpdates,
      setHasUpdates,
      hasNew,
      setHasNew,
    }),
    [
      flightPlans,
      setFlightPlans,
      processFlightPlans,
      markPlanImported,
      hasUpdates,
      setHasUpdates,
      hasNew,
      setHasNew,
    ]
  );
}
