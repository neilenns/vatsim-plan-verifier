// This giant mess of a giant mess takes care of processing a received list
// of vatsim flight plans and merging it with the current list of vatsim flight plans.
//
// It properly carries forward any state on the existing flight sim plans, and properly
// reports whether any new or modified plans came in.
import { DateTime } from "luxon";
import { ImportState, IVatsimFlightPlan } from "../interfaces/IVatsimFlightPlan.mjs";
import _ from "lodash";

type ProcessFlightPlansResult = {
  flightPlans: IVatsimFlightPlan[];
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

// Takes a JSON ISO date string and calculates the number of minutes between now and it.
export function minutesToEDCT(edctTime: string | undefined) {
  if (!edctTime) {
    return undefined;
  }

  return Math.round(
    DateTime.fromISO(edctTime, { zone: "UTC" }).diff(DateTime.utc(), "minutes").minutes
  );
}

// Takes a new plan and an existing plan and merges them together. The only
// property from the existing plan that is retained is the vatsimStatus.
//
// It also returns a boolean indicating whether any of the properties
// were different.
function mergeFlightPlans(
  incomingPlan: IVatsimFlightPlan,
  existingPlan: IVatsimFlightPlan,
  edctMode: boolean
): { flightPlan: IVatsimFlightPlan; hasUpdates: boolean } {
  let hasUpdates = false;

  if (edctMode) {
    // In EDCT mode the only changed property that matters is departureTime.
    hasUpdates ==
      (incomingPlan.revision !== existingPlan.revision &&
        incomingPlan.departureTime !== existingPlan.departureTime);
    incomingPlan.minutesToEDCT = minutesToEDCT(incomingPlan.EDCT);
    incomingPlan.EDCTDateTime = incomingPlan.EDCT
      ? DateTime.fromISO(incomingPlan.EDCT, { zone: "UTC" }).toJSDate()
      : undefined;
  } else {
    hasUpdates = incomingPlan.revision != existingPlan.revision;
  }

  const flightPlan = {
    ...incomingPlan,
    importState: hasUpdates ? ImportState.UPDATED : existingPlan.importState,
  } as IVatsimFlightPlan;

  return { flightPlan, hasUpdates };
}

export function processFlightPlans(
  currentPlans: IVatsimFlightPlan[],
  incomingPlans: IVatsimFlightPlan[],
  edctMode = false
): ProcessFlightPlansResult {
  let updatedPlansCount = 0;

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
      flightPlans: incomingPlans.map(
        (plan) =>
          ({
            ...plan,
            importState: ImportState.NEW,
            minutesToEDCT: minutesToEDCT(plan.EDCT),
          } as IVatsimFlightPlan)
      ),
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
  const existingPlans = _.intersectionBy(incomingPlans, currentPlans, "callsign").map(
    (incomingPlan) => {
      const currentPlan = currentPlans.find((p) => p.callsign === incomingPlan.callsign);
      if (currentPlan) {
        const mergeResult = mergeFlightPlans(incomingPlan, currentPlan, edctMode);
        mergeResult.hasUpdates ? updatedPlansCount++ : null;
        return mergeResult.flightPlan;
      } else {
        return incomingPlan;
      }
    }
  );

  // Now find the new ones by removing the existing ones from the incoming ones and
  // tag them as new.
  const newPlans = _.differenceBy(incomingPlans, existingPlans, "callsign").map((plan) => ({
    ...plan,
    vatsimStatus: ImportState.NEW,
    minutesToEDCT: minutesToEDCT(plan.EDCT),
  }));

  return {
    flightPlans: [...existingPlans, ...newPlans].sort((a, b) =>
      a.callsign!.localeCompare(b.callsign!)
    ),
    hasNew: newPlans.length > 0,
    hasUpdates: updatedPlansCount > 0,
  };
}
