import VatsimFlightPlanModel, { VatsimFlightPlan } from "../models/VatsimFlightPlan.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:vatsimController");

type VatsimFlightPlansResult = Result<VatsimFlightPlan[], "FlightPlansNotFound" | "UnknownError">;

export async function getVatsimFlightPlans(airport: string): Promise<VatsimFlightPlansResult> {
  try {
    const result = await VatsimFlightPlanModel.find({ departure: airport });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans for ${airport} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching flight plans for ${airport}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${airport}: ${error}`,
    };
  }
}