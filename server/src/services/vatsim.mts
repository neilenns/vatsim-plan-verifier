import axios, { AxiosResponse } from "axios";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import debug from "debug";
import { Server as SocketIOServer } from "socket.io";
import { getVatsimFlightPlans } from "./vatsimFlightPlans.mjs";

const logger = debug("plan-verifier:vatsimService");

let io: SocketIOServer;
let updateTimer: NodeJS.Timeout | undefined;

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
  logger("Starting vatsim auto-update");
  io = ioInstance;
  updateTimer = setInterval(() => {
    getVatsimFlightPlans(io);
  }, updateInterval);
}

export function stopVatsimAutoUpdate() {
  logger("Stopping vatsim auto-update");
  if (updateTimer) clearInterval(updateTimer);
}
