import debug from "debug";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import _ from "lodash";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { ENV } from "../env.mjs";
import { IVatsimData, IVatsimPilot, IVatsimPrefile } from "../interfaces/IVatsimData.mjs";
import {
  VatsimCommunicationMethod,
  VatsimFlightPlanDocument,
  VatsimFlightPlanModel,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";
import { copyPropertyValue } from "../utils/properties.mjs";

const logger = debug("plan-verifier:vatsimFlightPlans");
const updateLogger = debug("vatsim:updateFlightPlans");

// List of the properties on a vatsim flight plan that are eligible to
// be updated when new data is received. departure airport is intentionally
// not in this list as it is updated separately as part of the fix for issue 672.
const updateProperties = [
  "flightRules",
  "name",
  "rawAircraftType",
  "arrival",
  "route",
  "squawk",
  "remarks",
  "isPrefile",
  "cruiseAltitude",
  "communicationMethod",
  "deptime",
] as (keyof VatsimFlightPlanDocument)[];

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
    departureTime: pilot?.flight_plan?.deptime ?? "",
    groundspeed: pilot?.groundspeed ?? "",
    rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
    departure: pilot?.flight_plan?.departure ?? "",
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
    departureTime: prefile?.flight_plan?.deptime ?? "",
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

// When a new flight plan shows up it's not clear what it's initial status is. Knowing it is
// enroute is easy, it's just if the speed is above the cutoff. Departing vs arriving is a pain
// and can only be figured out by comparing the plane's location against either the departing
// or arriving airport.
async function setInitialFlightStatus(incomingPlan: VatsimFlightPlanDocument) {
  // Handle any plane that is enroute.
  if (incomingPlan.groundspeed ?? 0 > ENV.VATSIM_GROUNDSPEED_CUTOFF) {
    incomingPlan.status = VatsimFlightStatus.ENROUTE;
    return incomingPlan;
  }

  // If there's no departure airport or lat/lon info then assume they are departing
  if (!incomingPlan.departure || !incomingPlan.latitude || !incomingPlan.longitude) {
    incomingPlan.status = VatsimFlightStatus.DEPARTING;
    return incomingPlan;
  }

  // Check the plane's distance from the departure airport to see if it is departing or arriving.
  const departureAirportInfo = await getAirportInfo(incomingPlan.departure);

  // If there's no departure airport info then assume they are departing
  if (!departureAirportInfo.success) {
    incomingPlan.status = VatsimFlightStatus.DEPARTING;
    return incomingPlan;
  }

  // Calculate the distance between the plane and the departure airport. If it's greater than 10 miles assume
  // they are arriving.
  const departureAirport = departureAirportInfo.data;
  if (!departureAirport.latitude || !departureAirport.longitude) {
    incomingPlan.status = VatsimFlightStatus.DEPARTING;
    return incomingPlan;
  }

  const aircraftPosition = new LatLon(incomingPlan.latitude, incomingPlan.longitude);
  const departurePosition = new LatLon(departureAirport.latitude, departureAirport.longitude);
  const distanceToDeparture = aircraftPosition.distanceTo(departurePosition) / 1000; // Convert to km

  if (distanceToDeparture > 10) {
    incomingPlan.status = VatsimFlightStatus.ARRIVED;
    return incomingPlan;
  }

  // If we got this far then assume they are departing
  incomingPlan.status = VatsimFlightStatus.DEPARTING;
  return incomingPlan;
}

function updateGroundSpeedAndFlightStatus(
  incomingPlan: VatsimFlightPlanDocument,
  currentPlan: VatsimFlightPlanDocument
) {
  // Groundspeed is by far the noisiest property update. Try and quiet some of the updates.
  if (
    currentPlan.status === VatsimFlightStatus.ENROUTE &&
    (incomingPlan.groundspeed ?? 0) < ENV.VATSIM_GROUNDSPEED_CUTOFF
  ) {
    updateLogger(
      `Updating groundspeed from ${currentPlan.groundspeed} to ${incomingPlan.groundspeed}`
    );
    currentPlan.groundspeed = incomingPlan.groundspeed;
  } else if (
    currentPlan.status === VatsimFlightStatus.DEPARTING &&
    (incomingPlan.groundspeed ?? 0) > ENV.VATSIM_GROUNDSPEED_CUTOFF
  ) {
    updateLogger(
      `Updating groundspeed from ${currentPlan.groundspeed} to ${incomingPlan.groundspeed}`
    );
    currentPlan.groundspeed = incomingPlan.groundspeed;
  }

  // Check and see if the plane started moving since the last update. If so, assume it has taken off.
  if (
    currentPlan.status === VatsimFlightStatus.DEPARTING &&
    (incomingPlan.groundspeed ?? 0) > ENV.VATSIM_GROUNDSPEED_CUTOFF
  ) {
    currentPlan.status = VatsimFlightStatus.ENROUTE;
  }
  // If the plane was enroute and has stopped moving then consider it arrived.
  else if (
    currentPlan.status === VatsimFlightStatus.ENROUTE &&
    (incomingPlan?.groundspeed ?? 0) < ENV.VATSIM_GROUNDSPEED_CUTOFF
  ) {
    currentPlan.status = VatsimFlightStatus.ARRIVED;
  }
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
  logger(`Processing ${incomingPlans.length} incoming VATSIM flight plans`);

  // Find all the callsigns for the current plans in the database to use when figuring out
  // what updates to apply.
  const currentPlans = await VatsimFlightPlanModel.find({});
  updateLogger(`Current data count: ${currentPlans.length}`);

  // Find the new plans that don't currently exist in the database and set their
  // initial state. This method of awaiting mapped arrays is from https://stackoverflow.com/a/59471024/9206264
  const newPlanPromises = _.differenceBy(incomingPlans, currentPlans, "callsign").map((plan) =>
    setInitialFlightStatus(plan)
  );
  const newPlans = await Promise.all(newPlanPromises);
  updateLogger(`New data count: ${newPlans.length}`);

  // Find the plans in the database that no longer exist on vatsim.
  const deletedPlans = _.differenceBy(currentPlans, incomingPlans, "callsign");
  updateLogger(`Deleted data count: ${deletedPlans.length}`);

  // Find the overlapping plans that need to have updates applied
  const overlappingPlans = _.intersectionBy(incomingPlans, currentPlans, "callsign");
  updateLogger(`Overlapping data count: ${overlappingPlans.length}`);

  // Build out a dictionary of the current plans to improve performance of the update
  const currentPlansDictionary = _.keyBy(currentPlans, "callsign");

  // Loop through all the overlapping plans and apply any updated properties.
  const updatedPlans = overlappingPlans.map((incomingPlan) => {
    const currentPlan = currentPlansDictionary[incomingPlan.callsign];

    // Issue 672: If a plane lands and then refiles to go back out from the arrival airport but doesn't change
    // the callsign then the initial flight status has to be reset so the proper DEPARTING state is set.
    if (incomingPlan.departure !== currentPlan.departure) {
      currentPlan.departure = incomingPlan.departure;
      setInitialFlightStatus(currentPlan);
    } else {
      // Set the groundspeed and flight status. The two are interrelated
      // and groundspeed is super noisy so they are handled separately from the rest of the
      // property updates.
      updateGroundSpeedAndFlightStatus(incomingPlan, currentPlan);
    }
    // Update any changed properties
    updateProperties.forEach((property) =>
      copyPropertyValue(incomingPlan, currentPlan, property, updateLogger)
    );

    return currentPlan;
  });

  // Save all the changes to the database
  await Promise.all([
    // Delete the plans that no longer exist
    await VatsimFlightPlanModel.deleteMany({
      callsign: {
        $in: deletedPlans.map((plan) => plan.callsign),
      },
    }),
    // Add the new plans
    [...newPlans.map(async (plan) => await plan.save())],
    // Update the changed plans. This has to be done via save() to ensure middleware runs.
    [...updatedPlans.map(async (plan) => await plan.save())],
  ]);
}
