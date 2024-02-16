import mainLogger from "../logger.mjs";
import { PreferredRouteDocument, PreferredRouteModel } from "../models/PreferredRoute.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "preferredRoutes" });

export type PreferredRoutesFailureTypes = "NoPreferredRoutesFound" | "UnknownError";
export type PreferredRoutesResult = Result<PreferredRouteDocument[], PreferredRoutesFailureTypes>;

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
  } catch (err) {
    const error = err as Error;

    logger.error(
      `Unable to retrieve preferred routes for ${departure} to ${arrival}: ${error.message}`,
      error
    );
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to retrieve preferred routes for ${departure} to ${arrival}: ${error.message}.`,
    };
  }
}
