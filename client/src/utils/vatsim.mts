// This giant mess of a giant mess takes care of processing a received list
// of vatsim flight plans and merging it with the current list of vatsim flight plans.
//
// It properly carries forward any state on the existing flight sim plans, and properly
// reports whether any new or modified plans came in.
import IFlightPlan, { VatsimFlightPlanStatus } from "../interfaces/IFlightPlan.mts";
import _ from "lodash";

type ProcessFlightPlansResult = {
  flightPlans: IFlightPlan[];
  hasNew: boolean;
  hasUpdates: boolean;
};

export function getColorByStatus(status: VatsimFlightPlanStatus): string {
  switch (status) {
    case VatsimFlightPlanStatus.NEW:
      return "warning.main";
    case VatsimFlightPlanStatus.UPDATED:
      return "error.main";
    default:
      return "text.primary";
  }
}

// Takes a new plan and an existing plan and merges them together. The only
// property from the existing plan that is retained is the vatsimStatus,
// unless the incoming object has updates.
//
// It also returns a boolean indicating whether any of the properties
// were different.
function mergeFlightPlans(
  newPlan: IFlightPlan,
  existingPlan: IFlightPlan
): { flightPlan: IFlightPlan; hasUpdates: boolean } {
  // Figure out if any of the properties (other than _id) and vatsimStatus changed.
  const hasUpdates = Object.keys(existingPlan).some((key) => {
    return (
      key !== "_id" &&
      key !== "vatsimStatus" &&
      key !== "_v" &&
      existingPlan[key as keyof IFlightPlan] !== newPlan[key as keyof IFlightPlan]
    );
  });

  const flightPlan = {
    ...newPlan,
    _id: newPlan._id,
    vatsimStatus: hasUpdates ? VatsimFlightPlanStatus.UPDATED : existingPlan.vatsimStatus,
  } as IFlightPlan;

  return { flightPlan, hasUpdates };
}

export function processFlightPlans(
  currentPlans: IFlightPlan[],
  incomingPlans: IFlightPlan[]
): ProcessFlightPlansResult {
  let hasUpdates = false;

  // If there are no incoming plans then just return that.
  if (incomingPlans.length === 0) {
    return {
      flightPlans: incomingPlans,
      hasNew: false,
      hasUpdates: false,
    };
  }

  // If there are no current plans then we know everything incoming is new.
  if (currentPlans.length === 0) {
    return {
      flightPlans: incomingPlans.map((plan) => ({
        ...plan,
        vatsimStatus: VatsimFlightPlanStatus.NEW,
      })),
      hasNew: true,
      hasUpdates: false,
    };
  }

  // Ok this is where it gets fancy. Since there were existing items and new items
  // we need to figure out the overlap and return those, then include the new items.

  // This finds the overlap based on callsign. From the docs, intersectionBy orders
  // and returns references to objects in the first array, so this will give back
  // the incoming ones with the new _id property.
  //
  // The returned list then has its plans updated with the current vatsimStatus.
  //
  // Yes I agree this seems hugely inefficient.
  const existingPlans = _.intersectionBy(incomingPlans, currentPlans, "callsign").map((plan) => {
    const currentPlan = currentPlans.find((p) => p.callsign === plan.callsign);
    if (currentPlan) {
      const mergeResult = mergeFlightPlans(plan, currentPlan);
      hasUpdates = mergeResult.hasUpdates;
      return mergeResult.flightPlan;
    } else {
      return plan;
    }
  });

  // Now find the new ones by removing the existing ones from the incoming ones and
  // tag them as new.
  const newPlans = _.differenceBy(incomingPlans, existingPlans, "callsign").map((plan) => ({
    ...plan,
    vatsimStatus: VatsimFlightPlanStatus.NEW,
  }));

  return {
    flightPlans: [...existingPlans, ...newPlans].sort((a, b) =>
      a.callsign!.localeCompare(b.callsign!)
    ),
    hasNew: newPlans.length > 0,
    hasUpdates,
  };
}
