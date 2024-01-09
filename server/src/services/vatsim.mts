import axios, { AxiosResponse } from "axios";
import debug from "debug";
import { Server as SocketIOServer } from "socket.io";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { getVatsimFlightPlans } from "./vatsimFlightPlans.mjs";

const logger = debug("plan-verifier:vatsimService");

let io: SocketIOServer;
let updateTimer: NodeJS.Timeout | undefined;
let updateTimerInterval: number;

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

  updateTimer = setInterval(() => {
    getVatsimFlightPlans(io);
  }, updateInterval);
}

export function stopVatsimAutoUpdate() {
  logger("Stopping vatsim auto-update");
  if (updateTimer) clearInterval(updateTimer);
}
