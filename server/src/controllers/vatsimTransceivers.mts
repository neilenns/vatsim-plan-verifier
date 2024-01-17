import {
  TunedTransceiversDocument,
  TunedTransceiversModel,
} from "../models/VatsimTunedTransceivers.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:vatsimTransceiversController");

type VatsimTransceiversResult = Result<
  TunedTransceiversDocument,
  "CallsignNotFound" | "UnknownError"
>;

export async function getTunedTransceiversForCallsign(
  callsign: string
): Promise<VatsimTransceiversResult> {
  try {
    const transceivers = await TunedTransceiversModel.findOne({ callsign });

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
    logger(`Error fetching transceivers for ${callsign}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching transceivers for ${callsign}`,
    };
  }
}
