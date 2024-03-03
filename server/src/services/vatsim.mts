import axios, { type AxiosResponse } from "axios";
import fs from "fs";
import pluralize from "pluralize";
import { type Server as SocketIOServer } from "socket.io";
import { getVatsimEDCTFlightPlans, getVatsimEDCTViewOnly } from "../controllers/vatsim.mjs";
import { ENV } from "../env.mjs";
import { type IVatsimData } from "../interfaces/IVatsimData.mjs";
import type IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import mainLogger from "../logger.mjs";
import { VatsimFlightPlanModel, VatsimFlightStatus } from "../models/VatsimFlightPlan.mjs";
import { getIO } from "../sockets/index.mjs";
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
  } catch (err) {
    const error = err as Error;

    logger.error(`Unable to retrieve VATSIM endpoints: ${error.message}`, error);
    return null;
  }
}

// Loads data from vatsim then processes the relevant parts: filed and prefiled flight plans, and
// ATIS messages.
export async function getVatsimData(endpoint: string) {
  logger.info("Downloading latest VATSIM data");

  // For debugging/testing purposes, if a vatsim data file was specified
  // then load and use that instead of retrieving from the real server.
  // This enables making specific changes to flights and testing the results.
  if (ENV.VATSIM_DATA_FILE != null) {
    logger.debug(`Using VATSIM data from ${ENV.VATSIM_DATA_FILE}`);
    const data = await fs.promises.readFile(ENV.VATSIM_DATA_FILE, "utf-8");
    const vatsimData: IVatsimData = JSON.parse(data);

    await Promise.all([processVatsimATISData(vatsimData), processVatsimFlightPlanData(vatsimData)]);

    return;
  }
  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      await Promise.all([
        processVatsimATISData(response.data as IVatsimData),
        processVatsimFlightPlanData(response.data as IVatsimData),
      ]);
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unknown error: ${response.status} ${response.statusText}`,
      };
    }
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching VATSIM flight plans: ${error.message}`,
    };
  }
}

// Handles publishing updated data to all connected clients.
export async function publishUpdates(): Promise<void> {
  const io = getIO();

  // Loop through the rooms and send filtered data to clients in each room
  io.sockets.adapter.rooms.forEach(async (_, roomName) => {
    await publishFlightPlanUpdate(io, roomName);
    await publishEDCTupdate(io, roomName);
    await publishEDCTViewOnlyupdate(io, roomName);
  });
}

// Publishes flight plan updates to a specific room.
export async function publishFlightPlanUpdate(io: SocketIOServer, roomName: string): Promise<void> {
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
export async function publishEDCTViewOnlyupdate(
  io: SocketIOServer,
  roomName: string
): Promise<void> {
  // Every client gets put in their own auto-generated room. Skip those since there won't be any matching
  // database values.
  if (!roomName.startsWith("EDCTViewOnly:")) return;

  // Room names contain the departure codes the client requested, formatted like this:
  // EDCTViewOnly:KPDX,KSEA
  const rawDepartureCodes = roomName.replace("EDCTViewOnly:", "");
  const departureCodes = rawDepartureCodes.split(",");

  const flightPlans = await getVatsimEDCTViewOnly(departureCodes);

  if (flightPlans.success) {
    logger.info(`Emitting ${pluralize("result", flightPlans.data.length, true)} for ${roomName}`);
    io.to(roomName).emit("vatsimEDCTViewOnlyUpdate", flightPlans.data);
  }
}

// Publishes EDCT updates to a specific room.
export async function publishEDCTupdate(io: SocketIOServer, roomName: string): Promise<void> {
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
