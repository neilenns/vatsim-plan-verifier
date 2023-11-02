import { AircraftDocument, AircraftModel } from "../models/Aircraft.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:aircraftController");

type AircraftResult = Result<AircraftDocument, "AircraftNotFound" | "UnknownError">;
type AircraftsResult = Result<AircraftDocument[], "AircraftNotFound" | "UnknownError">;

export async function getAircraftByName(name: string): Promise<AircraftsResult> {
  try {
    const fetchedAircraft = await AircraftModel.findByName(name);

    if (fetchedAircraft) {
      return { success: true, data: fetchedAircraft };
    } else {
      return {
        success: false,
        errorType: "AircraftNotFound",
        error: `No aircraft with ${name} found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching aircraft ${name}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching aircraft ${name}: ${error}`,
    };
  }
}

export async function getAircraftById(id: string): Promise<AircraftResult> {
  try {
    const fetchedAircraft = await AircraftModel.findById(id);

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
