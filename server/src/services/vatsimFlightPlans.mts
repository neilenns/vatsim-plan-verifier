import _ from "lodash";
import { DateTime } from "luxon";
import { ENV } from "../env.mjs";
import { IVatsimData, IVatsimPilot } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { AirportInfoModel } from "../models/AirportInfo.mjs";
import {
  VatsimCommunicationMethod,
  VatsimFlightPlanDocument,
  VatsimFlightPlanModel,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";

const logger = mainLogger.child({ service: "vatsimFlightPlans" });

// List of the properties on a vatsim flight plan that are eligible to
// be updated when new data is received. departure airport is intentionally
// not in this list as it is updated separately as part of the fix for issue 672.
// latitude, longitude, and groundspeed are not in this list and are handled
// separately as part of the fix for issue 982.
const updateProperties = [
  "flightRules",
  "name",
  "rawAircraftType",
  "departure",
  "arrival",
  "route",
  "squawk",
  "remarks",
  "isPrefile",
  "cruiseAltitude",
  "communicationMethod",
  "departureTime",
] as (keyof VatsimFlightPlanDocument)[];

function depTimeToDateTime(depTime: string | undefined): Date | undefined {
  const result = depTime ? DateTime.fromFormat(depTime, "Hmm", { zone: "UTC" }) : undefined;

  // Issue #943: Super important to check that the fromFormat was successful, otherwise the string "Invalid date"
  // winds up trying to get set on the typegoose Date-typed property and fails, which causes the entire processing
  // of the data to fail.
  return result?.isValid ? result.toJSDate() : undefined;
}

function cleanRoute(route: string) {
  return route
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim() // Trim leading and trailing whitespace
    .replace(/\s+/g, " "); // Issue 601: Get rid of any multiple spaces between route parts
}

export function getCommunicationMethod(inputString: string | undefined): VatsimCommunicationMethod {
  if (inputString?.includes("/T/")) {
    return VatsimCommunicationMethod.TEXTONLY;
  } else if (inputString?.includes("/R/")) {
    return VatsimCommunicationMethod.RECEIVE;
  } else if (inputString?.includes("/V/")) {
    return VatsimCommunicationMethod.VOICE;
  } else {
    return VatsimCommunicationMethod.VOICE;
  }
}

// Takes a pilot object from vatsim and converts it to a vatsim model
export function pilotToVatsimModel(pilot: IVatsimPilot) {
  const result = new VatsimFlightPlanModel({
    cid: pilot.cid,
    name: pilot?.name,
    isPrefile: pilot.isPrefile,
    callsign: pilot?.callsign ?? "",
    groundspeed: pilot?.groundspeed ?? "",
    rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
    departure: pilot?.flight_plan?.departure,
    departureTime: depTimeToDateTime(pilot?.flight_plan?.deptime),
    arrival: pilot?.flight_plan?.arrival ?? "",
    latitude: pilot?.latitude,
    longitude: pilot?.longitude,
    route: cleanRoute(pilot?.flight_plan?.route ?? ""),
    squawk: pilot?.flight_plan?.assigned_transponder ?? "",
    remarks: pilot?.flight_plan?.remarks ?? "",
  });

  result.communicationMethod = getCommunicationMethod(result?.remarks);

  result.setCruiseAltitudeAndFlightRules(
    pilot?.flight_plan?.altitude,
    pilot?.flight_plan?.flight_rules
  );

  return result;
}

/**
 * Determines a plane's flight state based on its location and ground speed. Anything over VATSIM_GROUNDSPEED_CUTOFF
 * is considered ENROUTE. Anything slower than that within 3nm of the departure airport is considered DEPARTING.
 * Anything slower than that within 3nm of the arrival airport is considered ARRIVING.
 * @param flightPlan The flight plan.
 * @returns The plane's flight state.
 */
async function updateFlightStatus(
  flightPlan: VatsimFlightPlanDocument
): Promise<VatsimFlightStatus> {
  // All prefiles, planes without a departure airport, planes without a lat/long, and planes with no ground speed are assumed to be departing.
  if (
    flightPlan.isPrefile ||
    !flightPlan.departure ||
    !flightPlan.latitude ||
    !flightPlan.longitude ||
    flightPlan.groundspeed === undefined
  ) {
    return VatsimFlightStatus.DEPARTING;
  }

  // Anything going faster than the groundspeed cutoff is considered enroute.
  if (flightPlan.groundspeed > ENV.VATSIM_GROUNDSPEED_CUTOFF) {
    return VatsimFlightStatus.ENROUTE;
  }

  // Check and see if the plane is within the required distance of the departure airport.
  const distanceFromDepartureAirport = await AirportInfoModel.distanceTo(
    flightPlan.departure,
    flightPlan.latitude,
    flightPlan.longitude
  );

  if (
    distanceFromDepartureAirport &&
    distanceFromDepartureAirport < ENV.VATSIM_DISTANCE_CUTOFF_IN_KM
  ) {
    return VatsimFlightStatus.DEPARTING;
  }

  // Check and see if the plane is within the required distance of the arrival airport.
  const distanceFromArrivalAirport = await AirportInfoModel.distanceTo(
    flightPlan.arrival,
    flightPlan.latitude,
    flightPlan.longitude
  );

  if (distanceFromArrivalAirport && distanceFromArrivalAirport < ENV.VATSIM_DISTANCE_CUTOFF_IN_KM) {
    return VatsimFlightStatus.ARRIVED;
  }

  // This will happen if the airport distances couldn't be calculated for some reason, e.g. there's no
  // information available for the departure or arrival airport.
  return VatsimFlightStatus.UNKNOWN;
}

// Some properties change a *lot* and cause a ton of database updates. Instead of updating them
// every time only update them if the value changed a bit.
function updateNoisyProperties(currentPlan: VatsimFlightPlanDocument, incomingPlan: IVatsimPilot) {
  let delta: number;

  // Groundspeed
  delta = Math.abs((incomingPlan?.groundspeed ?? 0) - (currentPlan?.groundspeed ?? 0));
  if (delta > ENV.UPDATE_DELTA_GROUND_SPEED) {
    currentPlan.groundspeed = incomingPlan.groundspeed;
  }

  // Latitude
  delta = Math.abs((incomingPlan?.latitude ?? 0) - (currentPlan?.latitude ?? 0));
  if (delta > ENV.UPDATE_DELTA_LATITUDE) {
    currentPlan.latitude = incomingPlan.latitude;
  }

  // Longitude
  delta = Math.abs((incomingPlan?.longitude ?? 0) - (currentPlan?.longitude ?? 0));
  if (delta > ENV.UPDATE_DELTA_LONGITUDE) {
    currentPlan.longitude = incomingPlan.longitude;
  }
}

function setCoast(plan: VatsimFlightPlanDocument) {
  const now = DateTime.utc();

  // If it's not coasting yet give it a coasting time and add it to the overlapping plans list.
  // This will prevent it from getting deleted later on.
  if (!plan.coastAt) {
    plan.coastAt = now.toJSDate();
  }

  // Check and see how long the plane's been coasting. If it's longer than the threshold
  // then set its coastAt to undefined and it will wind up getting marked as not coasting
  // anymore and deleted. Otherwise do nothing (it's still coasting).
  const coastDiff = now.diff(DateTime.fromJSDate(plan.coastAt), "minutes").minutes;
  if (coastDiff > ENV.COAST_TIME_MINUTES) {
    plan.coastAt = undefined;
  }

  return plan;
}

// Takes the massive list of data from vatsim and processes it into the database.
// Both pilots (a.k.a flight plans) and prefiles are processed.
export async function processVatsimFlightPlanData(vatsimData: IVatsimData) {
  const overallProfiler = logger.startTimer();
  let profiler = logger.startTimer();

  // Build a dictionary of all the incoming plans, regardless of whether it's a prefile,
  // for use with the rest of the update logic. The dictionary is used when looking
  // for planes that were deleted.
  const incomingPlans = _.keyBy(
    [
      ...vatsimData.pilots,
      // The prefiles need the isPrefile flag set on them for use later on
      ...vatsimData.prefiles.map((prefile) => {
        return {
          ...prefile,
          isPrefile: true,
        };
      }),
    ],
    "callsign"
  );

  logger.info(`Processing ${_.size(incomingPlans)} incoming VATSIM flight plans`);
  profiler.done({ message: "Done creating list from incoming plans" });

  profiler = logger.startTimer();
  // Find all the callsigns for the current plans in the database to use when figuring out
  // what updates to apply and convert them to a dictionary to speed access later.
  const currentPlans = _.keyBy(await VatsimFlightPlanModel.find({}), "callsign");
  profiler.done({ message: "Done loading current plans from the database" });

  const plansToAdd: VatsimFlightPlanDocument[] = [];
  const plansToUpdate: VatsimFlightPlanDocument[] = [];
  const plansToDelete: VatsimFlightPlanDocument[] = [];
  let coastingCount = 0;
  let savedDataCount = 0;

  // Handle all the new and upated plans first
  profiler = logger.startTimer();
  for (const key in incomingPlans) {
    try {
      const incomingPlan = incomingPlans[key];
      const currentPlan = currentPlans[incomingPlan.callsign];

      // If it's not found then it's a new plan so just make the model object and add it to
      // the new plan array.
      if (!currentPlan) {
        const newPlan = pilotToVatsimModel(incomingPlan);
        // Important to set the initial flight status for the new plan. It could be in the air
        // or already arrived.
        await updateFlightStatus(newPlan);
        plansToAdd.push(newPlan);
        continue;
      }

      // This means it's an existing plan so we need to update properties
      currentPlan.flightRules = incomingPlan.flight_plan?.flight_rules ?? "";
      currentPlan.name = incomingPlan.flight_plan?.name ?? "";
      currentPlan.rawAircraftType = incomingPlan.flight_plan?.aircraft_faa ?? "";
      currentPlan.departure = incomingPlan.flight_plan?.departure ?? "";
      currentPlan.arrival = incomingPlan.flight_plan?.arrival ?? "";
      currentPlan.squawk = incomingPlan.flight_plan?.assigned_transponder ?? "";
      currentPlan.remarks = incomingPlan.flight_plan?.remarks ?? "";
      currentPlan.isPrefile = incomingPlan.isPrefile;
      currentPlan.coastAt = undefined; // Handles planes that reconnect after briefly disconnecting

      // Set the special properties that need calculations
      currentPlan.route = cleanRoute(incomingPlan.flight_plan?.route ?? "");
      currentPlan.departureTime = depTimeToDateTime(incomingPlan?.flight_plan?.deptime);
      currentPlan.communicationMethod = getCommunicationMethod(currentPlan.remarks);
      currentPlan.setCruiseAltitudeAndFlightRules(
        incomingPlan.flight_plan?.altitude,
        incomingPlan.flight_plan?.flight_rules
      );

      // Set the special properties that only apply to real plans (not prefiles)
      if (!currentPlan.isPrefile) {
        updateNoisyProperties(currentPlan, incomingPlan);
        await updateFlightStatus(currentPlan);
      }

      plansToUpdate.push(currentPlan);
    } catch (error) {
      logger.error(error);
    }
  }
  profiler.done({ message: "Done calculating new and updated plans" });

  // Now look for deleted plans
  profiler = logger.startTimer();
  for (const key in currentPlans) {
    const deletedOnServer = incomingPlans[key] === undefined;

    // If the plan wasn't deleted then just return, it was either new or updated.
    if (!deletedOnServer) continue;

    // Since the plan was deleted it needs its coast value calculated. If it
    // is coasting add it to the updated plans list. If it wasn't then it's really gone
    // and add it to the deleted plans list.
    const currentPlan = currentPlans[key];

    setCoast(currentPlan);
    if (currentPlans.isCoasting) {
      plansToUpdate.push(currentPlan);
      coastingCount++;
    } else {
      plansToDelete.push(currentPlan);
    }
  }
  profiler.done({ message: "Done calculating deleted and coast plans" });

  profiler = logger.startTimer();
  try {
    // Save all the changes to the database
    await Promise.all([
      // Delete the non-coasting plans
      await VatsimFlightPlanModel.deleteMany({
        callsign: {
          $in: plansToDelete.map((plan) => plan.callsign),
        },
      }),

      // Add the new plans
      await Promise.all([...plansToAdd.map(async (plan) => await plan.save())]),

      // Update the changed plans. This has to be done via save() to ensure middleware runs.
      await Promise.all([
        ...plansToUpdate.map(async (plan) => {
          // Issue 982: Turns out the save() method isn't smart and still does something even if there are
          // no modifications, which slows things down a TON. Check for modifications before calling save.
          const wasUpdated = await plan.saveIfModified();
          if (wasUpdated) savedDataCount++;
        }),
      ]),
    ]);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error updating flight plans: ${err.message}`);
  }
  profiler.done({ message: `Done processing database updates` });

  logger.debug(
    `Total deleted from server: ${plansToDelete.length} (${coastingCount} coasting and ${plansToDelete.length} to delete)`
  );

  logger.debug(`Saved ${savedDataCount} updated plans`, { savedDataCount });

  overallProfiler.done({
    message: `Done processing ${_.size(incomingPlans)} incoming VATSIM flight plans`,
    counts: {
      current: _.size(currentPlans),
      incoming: _.size(incomingPlans),
      new: plansToAdd.length,
      updated: plansToUpdate.length,
      deleted: plansToDelete.length,
      coasting: coastingCount,
      saved: savedDataCount,
    },
  });
}
