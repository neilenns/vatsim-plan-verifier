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
  "groundspeed",
  "latitude",
  "longitude",
] as (keyof VatsimFlightPlanDocument)[];

function depTimeToDateTime(depTime: string | undefined): DateTime | undefined {
  const result = depTime ? DateTime.fromFormat(depTime, "Hmm", { zone: "UTC" }) : undefined;

  return result;
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

// Takes a prefile from vatsim and converts it to a vatsim model.
export function prefileToVatsimModel(prefile: IVatsimPrefile) {
  const result = new VatsimFlightPlanModel({
    cid: prefile.cid,
    name: prefile?.name,
    isPrefile: true,
    callsign: prefile?.callsign ?? "",
    groundspeed: 0,
    departureTime: depTimeToDateTime(prefile?.flight_plan?.deptime),
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

// Takes the massive list of data from vatsim and processes it into the database.
// Both pilots (a.k.a flight plans) and prefiles are processed.
export async function processVatsimFlightPlanData(vatsimData: IVatsimData) {
  // Build a list of all the incoming plans, regardless of whether it's a prefile,
  // for use with the rest of the update logic.
  const incomingPlans = [
    ...vatsimData.pilots.map(pilotToVatsimModel),
    ...vatsimData.prefiles.map(prefileToVatsimModel),
  ];

  logger.info(`Processing ${incomingPlans.length} incoming VATSIM flight plans`);
  const profiler = logger.startTimer();

  // Find all the callsigns for the current plans in the database to use when figuring out
  // what updates to apply.
  const currentPlans = await VatsimFlightPlanModel.find({});

  // Find the new plans that don't currently exist in the database and set their
  // initial state. This method of awaiting mapped arrays is from https://stackoverflow.com/a/59471024/9206264
  const newPlanPromises = _.differenceBy(incomingPlans, currentPlans, "callsign").map(
    async (plan) => {
      plan.status = await updateFlightStatus(plan);
      return plan;
    }
  );
  const newPlans = await Promise.all(newPlanPromises);

  // Find the plans in the database that no longer exist on vatsim.
  const deletedPlans = _.differenceBy(currentPlans, incomingPlans, "callsign");

  // Find the overlapping plans that need to have updates applied
  const overlappingPlans = _.intersectionBy(incomingPlans, currentPlans, "callsign");

  // Build out a dictionary of the current plans to improve performance of the update
  const currentPlansDictionary = _.keyBy(currentPlans, "callsign");

  // Loop through all the overlapping plans and apply any updated properties.
  const updatedPlansPromises = overlappingPlans.map(async (incomingPlan) => {
    const currentPlan = currentPlansDictionary[incomingPlan.callsign];

    // Update any changed properties
    updateProperties.forEach((property) =>
      copyPropertyValue(incomingPlan, currentPlan, property, logger)
    );

    // Update the flight status
    currentPlan.status = await updateFlightStatus(currentPlan);

    return currentPlan;
  });
  const updatedPlans = await Promise.all(updatedPlansPromises);

  // Save all the changes to the database
  await Promise.all([
    // Delete the plans that no longer exist
    await VatsimFlightPlanModel.deleteMany({
      callsign: {
        $in: deletedPlans.map((plan) => plan.callsign),
      },
    }),
    // Add the new plans
    await Promise.all([...newPlans.map(async (plan) => await plan.save())]),
    // Update the changed plans. This has to be done via save() to ensure middleware runs.
    await Promise.all([...updatedPlans.map(async (plan) => await plan.save())]),
  ]);

  profiler.done({
    message: `Done processing ${incomingPlans.length} incoming VATSIM flight plans`,
    counts: {
      currentData: currentPlans.length,
      incomingData: incomingPlans.length,
      newData: newPlans.length,
      deletedData: deletedPlans.length,
      overlappingData: overlappingPlans.length,
    },
  });
}
