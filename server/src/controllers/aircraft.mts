import Aircraft, { IAircraft } from "../models/Aircraft.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:activeFlightPlanController");

type AircraftResult = Result<IAircraft, "AircraftNotFound" | "UnknownError">;

export async function getAircraft(id: string): Promise<AircraftResult> {
  try {
    const fetchedAircraft = await Aircraft.findById(id);

    if (fetchedAircraft) {
      return { success: true, data: fetchedAircraft };
    } else {
      return {
        success: false,
        errorType: "AircraftNotFound",
        error: `Aircraft ${id} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching aircraft ${id}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching aircraft ${id}: ${error}`,
    };
  }
}
