import {
  TunedTransceiversDocument,
  TunedTransceiversModel,
} from "../models/VatsimTunedTransceivers.mjs";
import { getVatsimTunedTransceivers } from "../services/vatsimTunedTransceivers.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:vatsimTransceiversController");

type VatsimTransceiversResult = Result<
  TunedTransceiversDocument,
  "CallsignNotFound" | "UnknownError"
>;

// Track how long it's been since the last time the data was refreshed. This prevents
// constantly updating the transceiver data when nobody needs the data.
let lastDataUpdateTime = 0;

export async function getTunedTransceiversForCallsign(
  callsign: string
): Promise<VatsimTransceiversResult> {
  try {
    // Check and see if the data has to be refreshed
    const currentTime = Date.now();
    if (currentTime - lastDataUpdateTime >= 15000) {
      logger(`Tuned transceivers data is out of date. Refreshing...`);
      await getVatsimTunedTransceivers();
      lastDataUpdateTime = Date.now();
    } else {
      logger(`Using cached transceiver data`);
    }

    const cachedData = await TunedTransceiversModel.findOne({ callsign });

    if (cachedData) {
      return {
        success: true,
        data: cachedData,
      };
    } else {
      return {
        success: false,
        errorType: "CallsignNotFound",
        error: `No transceivers found for ${callsign}`,
      };
    }
  } catch (error) {
    logger(`Error fetching transceivers for ${callsign}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching transceivers for ${callsign}`,
    };
  }
}
