import mainLogger from "../logger.mjs";
import { type DepartureDocument, DepartureModel } from "../models/Departure.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "departure" });

type DepartureResult = Result<DepartureDocument, "DepartureNotFound" | "UnknownError">;

export async function getDeparture(id: string): Promise<DepartureResult> {
  try {
    const fetchedDeparture = await DepartureModel.findById(id);

    if (fetchedDeparture != null) {
      return { success: true, data: fetchedDeparture };
    } else {
      return {
        success: false,
        errorType: "DepartureNotFound",
        error: `Departure ${id} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(`Error fetching departure ${id}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching departure ${id}: ${error.message}`,
    };
  }
}
