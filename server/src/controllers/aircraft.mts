import { type AircraftDocument, AircraftModel } from "../models/Aircraft.mjs";
import type Result from "../types/result.mjs";

import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "aircraft" });

type AircraftResult = Result<AircraftDocument, "AircraftNotFound" | "UnknownError">;
type AircraftsResult = Result<AircraftDocument[], "AircraftNotFound" | "UnknownError">;

export async function getAircraftByName(name: string): Promise<AircraftsResult> {
  try {
    const fetchedAircraft = await AircraftModel.findByName(name);

    if (fetchedAircraft.length > 0) {
      return { success: true, data: fetchedAircraft };
    } else {
      return {
        success: false,
        errorType: "AircraftNotFound",
        error: `No aircraft with ${name} found.`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(`Error fetching aircraft ${name}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching aircraft ${name}: ${error.message}`,
    };
  }
}

export async function getAircraftById(id: string): Promise<AircraftResult> {
  try {
    const fetchedAircraft = await AircraftModel.findById(id);

    if (fetchedAircraft != null) {
      return { success: true, data: fetchedAircraft };
    } else {
      return {
        success: false,
        errorType: "AircraftNotFound",
        error: `Aircraft ${id} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(`Error fetching aircraft ${id}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching aircraft ${id}: ${error.message}`,
    };
  }
}
