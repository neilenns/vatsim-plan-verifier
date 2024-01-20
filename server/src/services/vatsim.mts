import axios, { AxiosResponse } from "axios";
import debug from "debug";
import pluralize from "pluralize";
import { Server as SocketIOServer } from "socket.io";
import { getVatsimEDCTFlightPlans } from "../controllers/vatsim.mjs";
import { ENV } from "../env.mjs";
import { IVatsimData } from "../interfaces/IVatsimData.mjs";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { VatsimFlightPlanModel, VatsimFlightStatus } from "../models/VatsimFlightPlan.mjs";
import { processVatsimATISData } from "./vatsimATIS.mjs";
import { processVatsimFlightPlanData } from "./vatsimFlightPlans.mjs";
import { getVatsimTunedTransceivers } from "./vatsimTunedTransceivers.mjs";

const logger = debug("plan-verifier:vatsimService");

let io: SocketIOServer;
let dataUpdateTimer: NodeJS.Timeout | undefined;
let transceiverUpdateTimer: NodeJS.Timeout | undefined;
let dataUpdateTimerInterval: number;
let vatsimEndpoints: IVatsimEndpoints | null;

// Retrieves the published vatsim endpoints for the services. This is used to get
// the endpoint to retrieve all the current flight plans.
export async function getVatsimEndpoints() {
  try {
    const endpointUrl = "https://status.vatsim.net/status.json";

    logger("Downloading latest VATSIM endpoints");

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

function startVatsimTransceiverAutoUpdate(updateInterval: number) {
  if (transceiverUpdateTimer) {
    logger(`VATSIM transceiver auto-update is already running`);
    return;
  }

  logger(`Starting VATSIM transceiver auto-update every ${updateInterval / 1000} seconds`);

  transceiverUpdateTimer = setInterval(() => {
    getVatsimTunedTransceivers(vatsimEndpoints);
  }, updateInterval);
}

function startVatsimDataAutoUpdate(updateInterval: number) {
  if (dataUpdateTimerInterval === updateInterval) {
    logger(`VATSIM auto update already running every ${updateInterval / 1000} seconds`);
    return;
  }

  dataUpdateTimerInterval = updateInterval;

  // If there's already a timer running and its interval is different kill it off
  stopVatsimDataAutoUpdate();

  logger(`Starting VATSIM data auto update every ${updateInterval / 1000} seconds`);

  dataUpdateTimer = setInterval(() => {
    getVatsimData(vatsimEndpoints, io);
  }, updateInterval);
}

export async function startVatsimAutoUpdate(ioInstance: SocketIOServer) {
  io = ioInstance;

  // Only get the VATSIM endpoints if they haven't previously been retrieved.
  if (!vatsimEndpoints) {
    vatsimEndpoints = await getVatsimEndpoints();
  }

  // The speed of the data update depends on whether there are clients connected.
  let dataUpdateInterval: number;
  if (io.sockets.sockets.size > 0) {
    dataUpdateInterval = ENV.VATSIM_CONNECTIONS_AUTO_UPDATE_INTERVAL_MS;
  } else {
    dataUpdateInterval = ENV.VATSIM_NO_CONNECTIONS_AUTO_UPDATE_INTERVAL_MS;
  }

  startVatsimDataAutoUpdate(dataUpdateInterval);
  startVatsimTransceiverAutoUpdate(ENV.VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL_MS);
}

export function stopVatsimAutoUpdate() {
  stopVatsimDataAutoUpdate();
  stopVatsimTransceiverAutoUpdate();
}

export function stopVatsimDataAutoUpdate() {
  if (!dataUpdateTimer) {
    return;
  }

  logger("Stopping VATSIM data auto update");
  if (dataUpdateTimer) clearInterval(dataUpdateTimer);
  dataUpdateTimer = undefined;
}

export function stopVatsimTransceiverAutoUpdate() {
  logger("Stopping VATSIM transceiver auto update");
  if (transceiverUpdateTimer) clearInterval(transceiverUpdateTimer);
  transceiverUpdateTimer = undefined;
}

// Loads data from vatsim then processes the relevant parts: filed and prefiled flight plans, and
// ATIS messages.
// After updating the database publishes the updated flight plan list to all connected clients.
async function getVatsimData(endpoints: IVatsimEndpoints | null, io: SocketIOServer) {
  logger("Downloading latest VATSIM data");

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

// Handles publishing updated data to all connected clients.
async function publishUpdates(io: SocketIOServer) {
  if (!io) {
    logger(`Unable to publish updates, no sockets defined`);
    return;
  }

  // Loop through the rooms and send filtered data to clients in each room
  io.sockets.adapter.rooms.forEach(async (_, roomName) => {
    await publishFlightPlanUpdate(io, roomName);
    await publishEDCTupdate(io, roomName);
  });
}

// Publishes flight plan updates to a specific room.
export async function publishFlightPlanUpdate(io: SocketIOServer, roomName: string) {
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

// Publishes EDCT updates to a specific room.
export async function publishEDCTupdate(io: SocketIOServer, roomName: string) {
  if (!io) {
    logger(`Unable to publish updates, no sockets defined`);
    return;
  }

  // Every client gets put in their own auto-generated room. Skip those since there won't be any matching
  // database values. The assumption is all airport codes will be 3 or 4 characters long.
  if (!roomName.startsWith("EDCT:")) return;

  // Room names contain the departure and arrival codes the client requested, formatted like this:
  // EDCT:KPDX,KSEA\KSFO,KPDX
  // The departure airports are before the | and the arrival airports are after it. Split them apart.
  const [rawDepartureCodes, rawArrivalCodes] = roomName.replace("EDCT:", "").split("|");
  const departureCodes = rawDepartureCodes.split(",");
  const arrivalCodes = rawArrivalCodes.split(",");

  const flightPlans = await getVatsimEDCTFlightPlans(departureCodes, arrivalCodes);

  if (flightPlans.success) {
    logger(`Emitting ${pluralize("result", flightPlans.data.length, true)} for ${roomName}`);
    io.to(roomName).emit("vatsimEDCTupdate", flightPlans.data);
  }
}
