import {
  ExtendedAirportInfoModel,
  ExtendedAirportInfoDocument,
} from "../models/ExtendedAirportInfo.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:extendedAirportInfo");

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
  } catch (error) {
    logger(`Error fetching extended airport info for ${airportCode}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching extended airport info for ${airportCode}: ${error}`,
    };
  }
}
