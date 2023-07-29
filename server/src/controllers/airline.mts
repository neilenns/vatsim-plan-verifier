import Airline, { IAirline } from "../models/Airline.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:airlineController");
type AircraftResult = Result<IAirline[], "AirlineNotFound" | "UnknownError">;

export async function getAirline(airlineCode: string): Promise<AircraftResult> {
  try {
    const fetchedAirlines = await Airline.findByAirlineCode(airlineCode);

    if (fetchedAirlines) {
      return { success: true, data: fetchedAirlines };
    } else {
      return {
        success: false,
        errorType: "AirlineNotFound",
        error: `Airline ${airlineCode} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching airlines ${airlineCode}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching airlines ${airlineCode}: ${error}`,
    };
  }
}
