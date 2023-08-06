import IFlightPlan, { VatsimFlightPlanStatus } from "../interfaces/IFlightPlan.mts";
import _ from "lodash";

type ProcessFlightPlansResult = {
  flightPlans: IFlightPlan[];
  hasNew: boolean;
  hasUpdated: boolean;
};
export function processFlightPlans(
  currentPlans: IFlightPlan[],
  incomingPlans: IFlightPlan[]
): ProcessFlightPlansResult {
  // If there are no incoming plans then just return that.
  if (incomingPlans.length === 0) {
    return {
      flightPlans: incomingPlans,
      hasNew: false,
      hasUpdated: false,
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
      hasUpdated: false,
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
      return {
        ...plan,
        vatsimStatus: currentPlan.vatsimStatus,
      };
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
    hasUpdated: false,
  };
}
