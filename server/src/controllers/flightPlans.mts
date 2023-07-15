import IFlightPlan from "../interfaces/flightPlan.mjs";
import FlightPlan from "../models/flightPlan.mjs";

type FlightPlanSuccessResult = {
  success: true;
  data: IFlightPlan;
};

type FlightPlanFailureResult = {
  success: false;
  errorType: "FlightPlanNotFound" | "UnknownError";
  error: string;
};

type GetFlightPlanResult = FlightPlanSuccessResult | FlightPlanFailureResult;

export async function putFlightPlan(
  flightPlanData: IFlightPlan
): Promise<IFlightPlan> {
  try {
    // Create a new instance of the FlightPlan model
    const newFlightPlan = new FlightPlan(flightPlanData);

    // Save the flight plan to the database
    const savedFlightPlan = await newFlightPlan.save();

    return savedFlightPlan;
  } catch (error) {
    console.error(`Unable to save flight plan: ${error}`);
    throw error;
  }
}

export async function getFlightPlan(id: string): Promise<GetFlightPlanResult> {
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
