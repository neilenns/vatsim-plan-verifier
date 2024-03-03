import mainLogger from "../logger.mjs";
import {
  type ExtendedAirportInfoDocument,
  ExtendedAirportInfoModel,
} from "../models/ExtendedAirportInfo.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "extendedAirportInfo" });

type ExtendedAirportInfoResult = Result<
  ExtendedAirportInfoDocument,
  "ExtendedAirportInfoNotFound" | "UnknownError"
>;

export async function getExtendedAirportInfo(
  airportCode: string
): Promise<ExtendedAirportInfoResult> {
  try {
    const fetchedInfo = await ExtendedAirportInfoModel.findOne({ airportCode });

    if (fetchedInfo) {
      return { success: true, data: fetchedInfo };
    } else {
      return {
        success: false,
        errorType: "ExtendedAirportInfoNotFound",
        error: `Extended airport info not found for ${airportCode}.`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(
      `Error fetching extended airport info for ${airportCode}: ${error.message}`,
      error
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching extended airport info for ${airportCode}: ${error.message}`,
    };
  }
}
