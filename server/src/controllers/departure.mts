import DepartureModel, { Departure } from "../models/Departure.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:departureController");
type DepartureResult = Result<Departure, "DepartureNotFound" | "UnknownError">;

export async function getDeparture(id: string): Promise<DepartureResult> {
  try {
    const fetchedDeparture = await DepartureModel.findById(id);

    if (fetchedDeparture) {
      return { success: true, data: fetchedDeparture };
    } else {
      return {
        success: false,
        errorType: "DepartureNotFound",
        error: `Departure ${id} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching departure ${id}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching departure ${id}: ${error}`,
    };
  }
}
