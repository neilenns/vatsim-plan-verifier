import VatsimFlightPlanModel, { VatsimFlightPlan } from "../models/VatsimFlightPlan.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:vatsimController");

type VatsimFlightPlansResult = Result<VatsimFlightPlan[], "FlightPlansNotFound" | "UnknownError">;

export async function getVatsimFlightPlans(
  departure: string,
  flightRules: string,
  groundspeed: number
): Promise<VatsimFlightPlansResult> {
  try {
    const result = await VatsimFlightPlanModel.find({
      departure,
      flightRules,
      groundspeed: { $not: { $gt: groundspeed } },
    });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans for ${departure} matching ${flightRules} flight rules and a ground speed below ${groundspeed} not found.`,
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
