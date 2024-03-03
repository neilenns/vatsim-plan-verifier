import mainLogger from "../logger.mjs";
import { type AirlineDocument, AirlineModel } from "../models/Airline.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "airline" });
type AirlineResult = Result<AirlineDocument[], "AirlineNotFound" | "UnknownError">;

export async function getAirline(airlineCode: string): Promise<AirlineResult> {
  try {
    const fetchedAirlines = await AirlineModel.findByAirlineCode(airlineCode);

    if (fetchedAirlines) {
      return { success: true, data: fetchedAirlines };
    } else {
      return {
        success: false,
        errorType: "AirlineNotFound",
        error: `Airline ${airlineCode} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(`Error fetching airlines ${airlineCode}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching airlines ${airlineCode}: ${error}`,
    };
  }
}
