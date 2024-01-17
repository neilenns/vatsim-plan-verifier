import axios, { AxiosResponse } from "axios";
import debug from "debug";
import pluralize from "pluralize";
import { Server as SocketIOServer } from "socket.io";
import { IVatsimData } from "../interfaces/IVatsimData.mjs";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { VatsimFlightPlanModel, VatsimFlightStatus } from "../models/VatsimFlightPlan.mjs";
import { processVatsimATISData } from "./vatsimATIS.mjs";
import { processVatsimFlightPlanData } from "./vatsimFlightPlans.mjs";
import { getVatsimTunedTransceivers } from "./vatsimTunedTransceivers.mjs";

const logger = debug("plan-verifier:vatsimService");

let io: SocketIOServer;
let updateTimer: NodeJS.Timeout | undefined;
let updateTimerInterval: number;
let vatsimEndpoints: IVatsimEndpoints | null;

// Retrieves the published vatsim endpoints for the services. This is used to get
// the endpoint to retrieve all the current flight plans.
export async function getVatsimEndpoints() {
  try {
    const endpointUrl = "https://status.vatsim.net/status.json";

    logger("Retrieving VATSIM endpoints...");

    const response: AxiosResponse<IVatsimEndpoints> = await axios.get(endpointUrl);

    if (response.status === 200) {
      return response.data;
    } else {
      debug(`Unable to retrieve VATSIM endpoints: ${response.status} ${response.statusText}`);
      return null;
    }
  } catch (error) {
    debug(`Unable to retrieve VATSIM endpoints: ${error}`);
    return null;
  }
}

export async function startVatsimAutoUpdate(updateInterval: number, ioInstance: SocketIOServer) {
  if (updateTimerInterval === updateInterval) {
    logger(`Vatsim auto-update already running every ${updateInterval / 1000} seconds`);
    return;
  }

  updateTimerInterval = updateInterval;
  io = ioInstance;

  // If there's already a timer running and its interval is different kill it off
  stopVatsimAutoUpdate();

  logger(`Starting vatsim auto-update every ${updateInterval / 1000} seconds`);

  // Only get the VATSIM endpoints if they haven't previously been retrieved.
  if (!vatsimEndpoints) {
    vatsimEndpoints = await getVatsimEndpoints();
  }

  updateTimer = setInterval(() => {
    getVatsimData(vatsimEndpoints, io);
    getVatsimTunedTransceivers(vatsimEndpoints);
  }, updateInterval);
}

export function stopVatsimAutoUpdate() {
  logger("Stopping vatsim auto-update");
  if (updateTimer) clearInterval(updateTimer);
}

// Loads data from vatsim then processes the relevant parts: filed and prefiled flight plans, and
// ATIS messages.
// After updating the database publishes the updated flight plan list to all connected clients.
async function getVatsimData(endpoints: IVatsimEndpoints | null, io: SocketIOServer) {
  logger("Fetching VATSIM data...");

  const dataEndpoint = vatsimEndpoints?.data.v3[0];

  if (!dataEndpoint) {
    return {
      success: false,
      errorType: "VatsimFailure",
      error: `Unable to retrieve VATSIM data, no endpoints available.`,
    };
  }

  try {
    const response = await axios.get(dataEndpoint);

    if (response.status === 200) {
      await Promise.all([
        await processVatsimATISData(response.data as IVatsimData),
        await processVatsimFlightPlanData(response.data as IVatsimData),
      ]);
      await publishUpdates(io);
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

// Handles publishing updated data to all connected clients based on the airport code
// the client is watching.
async function publishUpdates(io: SocketIOServer) {
  if (!io) {
    logger(`Unable to publish updates, no sockets defined`);
    return;
  }

  // Loop through the rooms and send filtered data to clients in each room
  io.sockets.adapter.rooms.forEach(async (_, roomName) => {
    await publishUpdate(io, roomName);
  });
}

// Publishes updates to a specific room.
export async function publishUpdate(io: SocketIOServer, roomName: string) {
  if (!io) {
    logger(`Unable to publish updates, no sockets defined`);
    return;
  }

  // Every client gets put in their own auto-generated room. Skip those since there won't be any matching
  // database values. The assumption is all airport codes will be 3 or 4 characters long.
  if (!roomName.startsWith("APT:")) return;

  const airportCodes = roomName.replace("APT:", "").split(",");

  const flightPlans = await VatsimFlightPlanModel.find({
    departure: { $in: airportCodes },
    flightRules: "I",
    status: { $eq: VatsimFlightStatus.DEPARTING },
  }).sort({ callsign: 1 });

  logger(
    `Emitting ${pluralize("result", flightPlans.length, true)} for ${airportCodes.join(", ")}`
  );
  io.to(roomName).emit("vatsimFlightPlansUpdate", flightPlans);
}
