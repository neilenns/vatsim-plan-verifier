import { useCallback, useMemo } from "react";
import { useImmer } from "use-immer";
import { IVatsimFlightPlan, ImportState } from "../interfaces/IVatsimFlightPlan.mts";

type ProcessFlightPlansResult = {
  hasNew: boolean;
  hasUpdates: boolean;
};

export function useVatsim() {
  const [flightPlans, setFlightPlans] = useImmer<IVatsimFlightPlan[]>([]);

  const processFlightPlans = useCallback(
    (incomingPlans: IVatsimFlightPlan[]): ProcessFlightPlansResult => {
      let hasNew = false;
      let hasUpdates = false;

      console.log("Processing flight plans");
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

      // Find the deleted plans
      flightPlans.forEach((current, index) => {
        const found = incomingPlans.find((incoming) => incoming._id === current._id);

        // This means the plan in the current list no longer exists so remove it by index
        if (!found) {
          setFlightPlans((draft) => {
            draft.splice(index, 1);
          });
        }
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
              importState: ImportState.NEW,
            } as IVatsimFlightPlan);
            hasNew = true;
          }
          // It's an existing one so update it
          else {
            const updated = incoming.revision !== existing.revision;

            hasUpdates ||= updated;

            // Update the properties. departureTime is not included in this list since it doesn't
            // matter for plan verification.
            existing.arrival = incoming.arrival;
            existing.callsign = incoming.callsign;
            existing.departure = incoming.departure;
            existing.departureTime = incoming.departureTime;
            existing.importState = updated ? ImportState.UPDATED : existing.importState;
            existing.isCoasting = incoming.isCoasting;
            existing.isPrefile = incoming.isPrefile;
            existing.revision = incoming.revision;
          }
        });
      });

      return { hasNew, hasUpdates };
    },
    [flightPlans, setFlightPlans]
  );

  // Finds the callsign in the list of current plans, sets its
  // state to imported, then updates the state variable so the
  // page redraws.
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
      processFlightPlans,
      markPlanImported,
    }),
    [flightPlans, processFlightPlans, markPlanImported]
  );
}
