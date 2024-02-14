import mainLogger from "../logger.mjs";
import {
  TunedTransceiversDocument,
  TunedTransceiversModel,
} from "../models/VatsimTunedTransceivers.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "vatsimTransceivers" });

type VatsimTransceiversResult = Result<
  TunedTransceiversDocument,
  "CallsignNotFound" | "UnknownError"
>;

export async function getTunedTransceiversForCallsign(
  callsign: string
): Promise<VatsimTransceiversResult> {
  try {
    const transceivers = await TunedTransceiversModel.findOne({ callsign }).cacheQuery({ ttl: 30 });

    if (transceivers) {
      return {
        success: true,
        data: transceivers,
      };
    } else {
      return {
        success: false,
        errorType: "CallsignNotFound",
        error: `No transceivers found for ${callsign}`,
      };
    }
  } catch (error) {
    logger.error(`Error fetching transceivers for ${callsign}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching transceivers for ${callsign}`,
    };
  }
}
