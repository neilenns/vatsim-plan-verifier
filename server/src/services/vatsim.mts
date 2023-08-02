import axios, { AxiosResponse } from "axios";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { IVatsimData, IVatsimPilot, IVatsimPrefile } from "../interfaces/IVatsimData.mjs";
import VatsimFlightPlanModel from "../models/VatsimFlightPlan.mjs";
import debug from "debug";
import testData from "./vatsimdata.json" assert { type: "json" };
import { Server as SocketIOServer } from "socket.io";
import pluralize from "pluralize";

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

// Takes pilots from vatsim and processes them into the database.
async function processVatsimPilots(pilots: IVatsimPilot[]) {
  return Promise.all([
    pilots.map(async (pilot) => {
      if (!pilot?.callsign) return;
      if (pilot.groundspeed ?? 0 > 40) return;

      const flightPlan = new VatsimFlightPlanModel({
        callsign: pilot?.callsign ?? "",
        groundspeed: pilot?.groundspeed ?? "",
        rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
        departure: pilot?.flight_plan?.departure ?? "",
        arrival: pilot?.flight_plan?.arrival ?? "",
        cruiseAltitude: parseStringToNumber(pilot?.flight_plan?.altitude) / 100,
        route: cleanRoute(pilot?.flight_plan?.route ?? ""),
        squawk: pilot?.flight_plan?.assigned_transponder ?? "",
      });

      await flightPlan.save();
    }),
  ]);
}

// Takes prefiles from vatsim and processes them into the database.
async function processVatsimPrefiles(prefiles: IVatsimPrefile[]) {
  return Promise.all([
    prefiles.map(async (prefile) => {
      if (!prefile?.callsign) return;

      const flightPlan = new VatsimFlightPlanModel({
        callsign: prefile?.callsign ?? "",
        groundspeed: 0,
        rawAircraftType: prefile?.flight_plan?.aircraft_faa ?? "",
        departure: prefile?.flight_plan?.departure ?? "",
        arrival: prefile?.flight_plan?.arrival ?? "",
        cruiseAltitude: parseStringToNumber(prefile?.flight_plan?.altitude) / 100,
        route: cleanRoute(prefile?.flight_plan?.route ?? ""),
        squawk: prefile?.flight_plan?.assigned_transponder ?? "",
      });

      await flightPlan.save();
    }),
  ]);
}

// Takes the massive list of data from vatsim and processes it into the database.
// Both pilots (a.k.a flight plans) and prefiles are processed.
async function processVatsimData(flightPlans: IVatsimData) {
  await VatsimFlightPlanModel.deleteMany({});

  return Promise.all([
    processVatsimPilots(flightPlans.pilots),
    processVatsimPrefiles(flightPlans.prefiles),
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

    const flightPlans = await VatsimFlightPlanModel.find({ departure: { $in: airportCodes } }).sort(
      { callsign: 1 }
    );

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

  if (!vatsimEndpoints) {
    const endpointsResult = await getVatsimEndpoints();
    if (!endpointsResult.success) {
      logger("Unable to retrieve VATSIM endpoints");
      return {
        success: false,
        errorType: "VatsimFailure",
        error: "Unable to retrieve VATSIM endpoints",
      };
    } else {
      vatsimEndpoints = endpointsResult.data;
    }
  }

  const dataEndpoint = vatsimEndpoints?.data.v3[0];

  if (!dataEndpoint) {
    logger("Unable to retrieve VATSIM data endpoint");
    return {
      success: false,
      errorType: "VatsimFailure",
      error: "Unable to retrieve VATSIM data endpoint",
    };
  }

  try {
    const response = await axios.get(dataEndpoint);

    if (response.status === 200) {
      await processVatsimData(response.data as IVatsimData);
      await publishUpdates();
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
      error: `Error fetching VATSIM flight plans: ${error}`,
    };
  }
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
