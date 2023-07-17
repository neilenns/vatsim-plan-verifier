import FlightPlan, { IFlightPlan } from "../models/FlightPlan.mjs";
import Result from "../types/result.mjs";

type FlightPlanResult = Result<
  IFlightPlan,
  "FlightPlanNotFound" | "UnknownError"
>;

export async function putFlightPlan(
  flightPlanData: IFlightPlan
): Promise<FlightPlanResult> {
  try {
    // Create a new instance of the FlightPlan model
    const newFlightPlan = new FlightPlan(flightPlanData);

    // Save the flight plan to the database
    const savedFlightPlan = await newFlightPlan.save();

    return {
      success: true,
      data: savedFlightPlan,
    };
  } catch (error) {
    console.error(`Unable to save flight plan: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to save the flight plan: ${error}.`,
    };
  }
}

export async function getFlightPlan(id: string): Promise<FlightPlanResult> {
  try {
    const flightPlan = await FlightPlan.findById(id);

    if (!flightPlan) {
      return {
        success: false,
        errorType: "FlightPlanNotFound",
        error: `Flight plan ${id} not found.`,
      };
    }

    return {
      success: true,
      data: flightPlan,
    };
  } catch (error) {
    console.error(`Unable to retrieve flight plan ${id}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to get the flight plan: ${error}.`,
    };
  }
}
