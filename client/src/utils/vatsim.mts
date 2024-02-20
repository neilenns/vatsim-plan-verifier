// This giant mess of a giant mess takes care of processing a received list
// of vatsim flight plans and merging it with the current list of vatsim flight plans.
//
// It properly carries forward any state on the existing flight sim plans, and properly
// reports whether any new or modified plans came in.
import { Updater } from "use-immer";
import { ImportState, IVatsimFlightPlan } from "../interfaces/IVatsimFlightPlan.mjs";

type ProcessFlightPlansResult = {
  hasNew: boolean;
  hasUpdates: boolean;
};

export function getColorByStatus(status: ImportState | undefined): string {
  switch (status) {
    case ImportState.NEW:
      return "warning.main";
    case ImportState.UPDATED:
      return "error.main";
    default:
      return "text.primary";
  }
}

export function processFlightPlans(
  currentPlans: IVatsimFlightPlan[],
  incomingPlans: IVatsimFlightPlan[],
  setFlightPlans: Updater<IVatsimFlightPlan[]>
): ProcessFlightPlansResult {
  let hasNew = false;
  let hasUpdates = false;

  // If there are no incoming plans then just return that.
  if (incomingPlans.length === 0) {
    currentPlans = [];
    return {
      hasNew: false,
      hasUpdates: false,
    };
  }

  // Find the deleted plans
  currentPlans.forEach((current, index) => {
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

        if (!updated) {
          return;
        }

        hasUpdates ||= updated;

        // Update the properties. departureTime is not included in this list since it doesn't
        // matter for plan verification.
        existing.arrival = incoming.arrival;
        existing.callsign = incoming.callsign;
        existing.departure = incoming.departure;
        existing.departureTime = incoming.departureTime;
        existing.importState = ImportState.UPDATED;
        existing.isCoasting = incoming.isCoasting;
        existing.isPrefile = incoming.isPrefile;
        existing.revision = incoming.revision;
      }
    });
  });

  return { hasNew, hasUpdates };
}
