import { PreferredRoute, PreferredRouteModel } from "../models/PreferredRoute.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:preferredRoutesController");

export type PreferredRoutesFailureTypes = "NoPreferredRoutesFound" | "UnknownError";
export type PreferredRoutesResult = Result<PreferredRoute[], PreferredRoutesFailureTypes>;

export async function getPreferredRoutes(
  departure: string,
  arrival: string
): Promise<PreferredRoutesResult> {
  try {
    const preferredRoutes = await PreferredRouteModel.find({
      departure,
      arrival,
    });

    if (!preferredRoutes || preferredRoutes.length === 0) {
      return {
        success: false,
        errorType: "NoPreferredRoutesFound",
        error: `No preferred routes found for ${departure} to ${arrival}.`,
      };
    }

    return {
      success: true,
      data: preferredRoutes,
    };
  } catch (error) {
    logger(`Unable to retrieve preferred routes for ${departure} to ${arrival}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to retrieve preferred routes for ${departure} to ${arrival}: ${error}.`,
    };
  }
}
