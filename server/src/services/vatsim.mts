import axios, { AxiosResponse } from "axios";
import pluralize from "pluralize";
import { Server as SocketIOServer } from "socket.io";
import { getVatsimEDCTFlightPlans } from "../controllers/vatsim.mjs";
import { IVatsimData } from "../interfaces/IVatsimData.mjs";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import mainLogger from "../logger.mjs";
import { VatsimFlightPlanModel, VatsimFlightStatus } from "../models/VatsimFlightPlan.mjs";
import { processVatsimATISData } from "./vatsimATIS.mjs";
import { processVatsimFlightPlanData } from "./vatsimFlightPlans.mjs";

const logger = mainLogger.child({ service: "vatsim" });

// Retrieves the published vatsim endpoints for the services. This is used to get
// the endpoint to retrieve all the current flight plans.
export async function getVatsimEndpoints() {
  try {
    const endpointUrl = "https://status.vatsim.net/status.json";

    logger.info("Downloading latest VATSIM endpoints");

    const response: AxiosResponse<IVatsimEndpoints> = await axios.get(endpointUrl);

    if (response.status === 200) {
      return response.data;
    } else {
      logger.error(
        `Unable to retrieve VATSIM endpoints: ${response.status} ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    logger.error(`Unable to retrieve VATSIM endpoints: ${error}`);
    return null;
  }
}

// Loads data from vatsim then processes the relevant parts: filed and prefiled flight plans, and
// ATIS messages.
export async function getVatsimData(endpoint: string) {
  logger.info("Downloading latest VATSIM data");

  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      await Promise.all([
        await processVatsimATISData(response.data as IVatsimData),
        await processVatsimFlightPlanData(response.data as IVatsimData),
      ]);
      // await publishUpdates(io);
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
export async function publishUpdates(io: SocketIOServer) {
  if (!io) {
    logger.warn(`Unable to publish updates, no sockets defined`);
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
    logger.warn(`Unable to publish updates, no sockets defined`);
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

  logger.info(
    `Emitting ${pluralize("result", flightPlans.length, true)} for ${airportCodes.join(", ")}`
  );
  io.to(roomName).emit("vatsimFlightPlansUpdate", flightPlans);
}

// Publishes EDCT updates to a specific room.
export async function publishEDCTupdate(io: SocketIOServer, roomName: string) {
  if (!io) {
    logger.warn(`Unable to publish updates, no sockets defined`);
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
    logger.info(`Emitting ${pluralize("result", flightPlans.data.length, true)} for ${roomName}`);
    io.to(roomName).emit("vatsimEDCTupdate", flightPlans.data);
  }
}
