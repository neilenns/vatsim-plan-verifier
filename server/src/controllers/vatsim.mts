import {
  VatsimFlightPlanModel,
  VatsimFlightPlanDocument,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:vatsimController");

type VatsimFlightPlansResult = Result<
  VatsimFlightPlanDocument[],
  "FlightPlansNotFound" | "UnknownError"
>;

export async function getVatsimFlightPlans(
  departure: string,
  flightRules: string,
  status: VatsimFlightStatus
): Promise<VatsimFlightPlansResult> {
  try {
    const result = await VatsimFlightPlanModel.find({
      departure,
      flightRules,
      status,
    });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans for ${departure} matching ${flightRules} flight rules and status ${status} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching flight plans for ${departure}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departure}: ${error}`,
    };
  }
}
