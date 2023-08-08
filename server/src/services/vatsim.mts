import axios, { AxiosResponse } from "axios";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { IVatsimData, IVatsimPilot, IVatsimPrefile } from "../interfaces/IVatsimData.mjs";
import VatsimFlightPlanModel from "../models/VatsimFlightPlan.mjs";
import debug from "debug";
import { Server as SocketIOServer } from "socket.io";
import pluralize from "pluralize";
import { ENV } from "../env.mjs";
import _ from "lodash";
import vatsimplans from "./vatsimdata_2.json" assert { type: "json" };

const logger = debug("plan-verifier:vatsimService");
let vatsimEndpoints: IVatsimEndpoints | undefined;
let io: SocketIOServer;
let updateTimer: NodeJS.Timeout | undefined;

function cleanRoute(route: string) {
  return route
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim();
}

function parseStringToNumber(value: string) {
  const convertedValue = Number(value);
  if (isNaN(convertedValue)) return 0;
  return convertedValue;
}

// Takes a pilot object from vatsim and converts it to a vatsim model
function pilotToVatsimModel(pilot: IVatsimPilot) {
  return new VatsimFlightPlanModel({
    callsign: pilot?.callsign ?? "",
    groundspeed: pilot?.groundspeed ?? "",
    rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
    departure: pilot?.flight_plan?.departure ?? "",
    arrival: pilot?.flight_plan?.arrival ?? "",
    cruiseAltitude: parseStringToNumber(pilot?.flight_plan?.altitude) / 100,
    route: cleanRoute(pilot?.flight_plan?.route ?? ""),
    squawk: pilot?.flight_plan?.assigned_transponder ?? "",
    remarks: pilot?.flight_plan?.remarks ?? "",
    flightRules: pilot?.flight_plan?.flight_rules ?? "",
  });
}

// Takes a prefile from vatsim and converts it to a vatsim model.
function processVatsimPrefiles(prefile: IVatsimPrefile) {
  return new VatsimFlightPlanModel({
    callsign: prefile?.callsign ?? "",
    groundspeed: 0,
    rawAircraftType: prefile?.flight_plan?.aircraft_faa ?? "",
    departure: prefile?.flight_plan?.departure ?? "",
    arrival: prefile?.flight_plan?.arrival ?? "",
    cruiseAltitude: parseStringToNumber(prefile?.flight_plan?.altitude) / 100,
    route: cleanRoute(prefile?.flight_plan?.route ?? ""),
    squawk: prefile?.flight_plan?.assigned_transponder ?? "",
    remarks: prefile?.flight_plan?.remarks ?? "",
    flightRules: prefile?.flight_plan?.flight_rules ?? "",
  });
}

// Takes the massive list of data from vatsim and processes it into the database.
// Both pilots (a.k.a flight plans) and prefiles are processed.
async function processVatsimData(flightPlans: IVatsimData) {
  // Build a list of all the incoming plans, regardless of whether it's a prefile,
  // for use with the rest of the update logic.
  const incomingPlans = [
    ...flightPlans.pilots.map(pilotToVatsimModel),
    ...flightPlans.prefiles.map(processVatsimPrefiles),
  ];
  logger(`Processing ${incomingPlans.length} incoming plans`);

  // Find all the callsigns for the current plans in the database to use when figuring out
  // what updates to apply.
  const currentPlans = (await VatsimFlightPlanModel.find({}).select("callsign")).map((plan) => {
    return plan.callsign;
  });
  logger(`Found ${currentPlans.length} current plans`);

  // Find the new plans that don't currently exist in the database.
  const newPlans = _.differenceWith(incomingPlans, currentPlans, (incoming, current) => {
    return incoming.callsign === current;
  });
  logger(`There are ${newPlans.length} new plans`);

  // Find the plans in the database that no longer exist on vatsim.
  const deletedPlans = _.differenceWith(currentPlans, incomingPlans, (current, incoming) => {
    return current === incoming.callsign;
  });
  logger(`There are ${deletedPlans.length} deleted plans`);

  // Apply the updates
  await Promise.all([
    // Add the new plans
    VatsimFlightPlanModel.bulkSave(newPlans),
    // Delete the plans that no longer exist
    VatsimFlightPlanModel.deleteMany({ callsign: { $in: deletedPlans } }),
  ]);
}

// Retrieves the published vatsim endpoints for the services. This is used to get
// the endpoint to retrieve all the current flight plans.
export async function getVatsimEndpoints() {
  try {
    const endpointUrl = "https://status.vatsim.net/status.json";

    const response: AxiosResponse<IVatsimEndpoints> = await axios.get(endpointUrl);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unknown error: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching VATSIM endpoints: ${error}`,
    };
  }
}

// Handles publishing updated data to all connected clients based on the airport code
// the client is watching.
async function publishUpdates() {
  if (!io) {
    return;
  }

  // Loop through the rooms and send filtered data to clients in each room
  io.sockets.adapter.rooms.forEach(async (_, roomName) => {
    // Every client gets put in their own auto-generated room. Skip those since there won't be any matching
    // database values. The assumption is all airport codes will be 3 or 4 characters long.
    if (!roomName.startsWith("APT:")) return;

    const airportCodes = roomName.replace("APT:", "").split(",");

    const flightPlans = await VatsimFlightPlanModel.find({
      departure: { $in: airportCodes },
      flightRules: "I",
      groundspeed: { $not: { $gt: ENV.VATSIM_GROUNDSPEED_CUTOFF } },
    }).sort({ callsign: 1 });

    logger(
      `Emitting ${pluralize("result", flightPlans.length, true)} for ${airportCodes.join(", ")}`
    );
    io.to(roomName).emit("vatsimFlightPlansUpdate", flightPlans);
  });
}

// Loads data from vatsim then processes the filed and prefiled flight plans in to the database.
// After updating the database publishes the updated flight plan list to all connected clients.
export async function getVatsimFlightPlans() {
  if (io?.sockets.adapter.rooms.size === 0) {
    return;
  }

  logger("Fetching VATSIM flight plans...");
  processVatsimData(vatsimplans as IVatsimData);

  // if (!vatsimEndpoints) {
  //   const endpointsResult = await getVatsimEndpoints();
  //   if (!endpointsResult.success) {
  //     logger("Unable to retrieve VATSIM endpoints");
  //     return {
  //       success: false,
  //       errorType: "VatsimFailure",
  //       error: "Unable to retrieve VATSIM endpoints",
  //     };
  //   } else {
  //     vatsimEndpoints = endpointsResult.data;
  //   }
  // }

  // const dataEndpoint = vatsimEndpoints?.data.v3[0];

  // if (!dataEndpoint) {
  //   logger("Unable to retrieve VATSIM data endpoint");
  //   return {
  //     success: false,
  //     errorType: "VatsimFailure",
  //     error: "Unable to retrieve VATSIM data endpoint",
  //   };
  // }

  // try {
  //   const response = await axios.get(dataEndpoint);

  //   if (response.status === 200) {
  //     await processVatsimData(response.data as IVatsimData);
  //     await publishUpdates();
  //   } else {
  //     return {
  //       success: false,
  //       errorType: "UnknownError",
  //       error: `Unknown error: ${response.status} ${response.statusText}`,
  //     };
  //   }
  // } catch (error) {
  //   return {
  //     success: false,
  //     errorType: "UnknownError",
  //     error: `Error fetching VATSIM flight plans: ${error}`,
  //   };
  // }
}

export async function startVatsimAutoUpdate(updateInterval: number, ioInstance: SocketIOServer) {
  logger("Starting vatsim auto-update");
  io = ioInstance;
  updateTimer = setInterval(getVatsimFlightPlans, updateInterval);
}

export function stopVatsimAutoUpdate() {
  logger("Stopping vatsim auto-update");
  if (updateTimer) clearInterval(updateTimer);
}
