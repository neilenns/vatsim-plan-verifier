import _ from "lodash";
import { DateTime } from "luxon";
import { ENV } from "../env.mjs";
import { IVatsimData, IVatsimPilot, IVatsimPrefile } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { AirportInfoModel } from "../models/AirportInfo.mjs";
import {
  VatsimCommunicationMethod,
  VatsimFlightPlanDocument,
  VatsimFlightPlanModel,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";
import { copyPropertyValue } from "../utils/properties.mjs";

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

function depTimeToDateTime(depTime: string | undefined): DateTime | undefined {
  const result = depTime ? DateTime.fromFormat(depTime, "Hmm", { zone: "UTC" }) : undefined;

  // Issue #943: Super important to check that the fromFormat was successful, otherwise the string "Invalid date"
  // winds up trying to get set on the typegoose Date-typed property and fails, which causes the entire processing
  // of the data to fail.
  return result?.isValid ? result : undefined;
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
    isPrefile: false,
    callsign: pilot?.callsign ?? "",
    groundspeed: pilot?.groundspeed ?? "",
    rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
    departure: pilot?.flight_plan?.departure,
    departureTime: depTimeToDateTime(pilot?.flight_plan?.deptime)?.toJSDate(),
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

// Takes a prefile from vatsim and converts it to a vatsim model.
export function prefileToVatsimModel(prefile: IVatsimPrefile) {
  const result = new VatsimFlightPlanModel({
    cid: prefile.cid,
    name: prefile?.name,
    isPrefile: true,
    callsign: prefile?.callsign ?? "",
    groundspeed: 0,
    departureTime: depTimeToDateTime(prefile?.flight_plan?.deptime)?.toJSDate(),
    rawAircraftType: prefile?.flight_plan?.aircraft_faa ?? "",
    departure: prefile?.flight_plan?.departure ?? "",
    arrival: prefile?.flight_plan?.arrival ?? "",
    route: cleanRoute(prefile?.flight_plan?.route ?? ""),
    squawk: prefile?.flight_plan?.assigned_transponder ?? "",
    remarks: prefile?.flight_plan?.remarks ?? "",
  });

  result.communicationMethod = getCommunicationMethod(result?.remarks);

  result.setCruiseAltitudeAndFlightRules(
    prefile?.flight_plan?.altitude,
    prefile?.flight_plan?.flight_rules
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
function updateNoisyProperties(
  currentPlan: VatsimFlightPlanDocument,
  incomingPlan: VatsimFlightPlanDocument
) {
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

  // Build a list of all the incoming plans, regardless of whether it's a prefile,
  // for use with the rest of the update logic.
  const incomingPlans = [
    ...vatsimData.pilots.map(pilotToVatsimModel),
    ...vatsimData.prefiles.map(prefileToVatsimModel),
  ];
  profiler.done({ message: "Done creating models from incoming plans" });

  logger.info(`Processing ${incomingPlans.length} incoming VATSIM flight plans`);

  profiler = logger.startTimer();
  // Find all the callsigns for the current plans in the database to use when figuring out
  // what updates to apply.
  const currentPlans = await VatsimFlightPlanModel.find({});
  profiler.done({ message: "Done loading current plans from the database" });

  // Find the new plans that don't currently exist in the database and set their
  // initial state. This method of awaiting mapped arrays is from https://stackoverflow.com/a/59471024/9206264
  profiler = logger.startTimer();
  const newPlanPromises = _.differenceBy(incomingPlans, currentPlans, "callsign").map(
    async (plan) => {
      plan.status = await updateFlightStatus(plan);
      return plan;
    }
  );
  const newPlans = await Promise.all(newPlanPromises);
  profiler.done({ message: "Done creating new flight plans and setting their initial state" });

  // Find the plans in the database that no longer exist on vatsim. Anything in the initial
  // list of deleted plans first has to move through a coasting phase. This covers the case
  // where a plane briefly disconnects over the update interval, to ensure it doesn't disappear
  // then come back as new flight.
  profiler = logger.startTimer();
  let deletedPlans = _.differenceBy(currentPlans, incomingPlans, "callsign").map((plan) =>
    setCoast(plan)
  );
  // Split out only the plans that need deleting so they can be deleted in bulk
  // instead of one by one.
  const plansToDelete = deletedPlans.filter((plan) => !plan.isCoasting);
  profiler.done({ message: "Done calculating deleted and coast plans" });

  // Find the overlapping plans that need to have updates applied
  profiler = logger.startTimer();
  const overlappingPlans = _.intersectionBy(incomingPlans, currentPlans, "callsign");
  profiler.done({ message: "Done finding overlapping plans" });

  // Build out a dictionary of the current plans to improve performance of the update
  profiler = logger.startTimer();
  const currentPlansDictionary = _.keyBy(currentPlans, "callsign");
  profiler.done({ message: "Done building the dictionary of current plans" });

  // Loop through all the overlapping plans and apply any updated properties.
  profiler = logger.startTimer();
  const updatedPlansPromises = overlappingPlans.map(async (incomingPlan) => {
    const currentPlan = currentPlansDictionary[incomingPlan.callsign];

    // Update any changed properties
    updateProperties.forEach((property) =>
      copyPropertyValue(incomingPlan, currentPlan, property, logger)
    );

    // Update the noisy properties
    updateNoisyProperties(currentPlan, incomingPlan);

    // Update the flight status. This has to happen after noisy property update
    // as it depends on groundspeed, latitude, and longitude.
    currentPlan.status = await updateFlightStatus(currentPlan);

    // Clear the coast if it was set. This happens when the plane reconnects after disconnecting briefly.
    currentPlan.coastAt = undefined;

    return currentPlan;
  });
  const updatedPlans = await Promise.all(updatedPlansPromises);
  profiler.done({ message: "Done updating all the existing plans" });

  let savedDataCount = 0;
  let coastingCount = 0;

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

      // Update the coasting plans
      await Promise.all([
        ...deletedPlans.map(async (plan) => {
          if (plan.isCoasting) {
            const result = await plan.saveIfModified();
            coastingCount++;
            if (result) {
              savedDataCount++;
            }
          }
        }),
      ]),

      // Add the new plans
      await Promise.all([...newPlans.map(async (plan) => await plan.save())]),

      // Update the changed plans. This has to be done via save() to ensure middleware runs.
      await Promise.all([
        ...updatedPlans.map(async (plan) => {
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
    `Total deleted from server: ${deletedPlans.length} (${coastingCount} coasting and ${plansToDelete.length} to delete)`
  );

  logger.debug(`Saved ${savedDataCount} updated plans`, { savedDataCount });

  overallProfiler.done({
    message: `Done processing ${incomingPlans.length} incoming VATSIM flight plans`,
    counts: {
      current: currentPlans.length,
      incoming: incomingPlans.length,
      new: newPlans.length,
      totalDeletedOnServer: deletedPlans.length,
      deleted: plansToDelete.length,
      coasting: coastingCount,
      overlapping: overlappingPlans.length,
      saved: savedDataCount,
    },
  });
}
