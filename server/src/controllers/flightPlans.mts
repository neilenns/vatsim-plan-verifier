import FlightPlan, { IFlightPlan } from "../models/FlightPlan.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:flightPlansController");

export type PagedData = {
  pages: number;
  flightPlans: IFlightPlan[];
};

export type FlightPlanFailureErrorTypes = "FlightPlanNotFound" | "UnknownError";
export type PagedFlightPlansFailureErrorTypes = "FlightPlansNotFound" | "UnknownError";

export type FlightPlanResult = Result<IFlightPlan, FlightPlanFailureErrorTypes>;
export type PagedFlightPlansResult = Result<PagedData, PagedFlightPlansFailureErrorTypes>;

export async function putFlightPlan(flightPlanData: IFlightPlan): Promise<FlightPlanResult> {
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
    logger(`Unable to save flight plan: ${error}`);

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
    logger(`Unable to retrieve flight plan ${id}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to get the flight plan: ${error}.`,
    };
  }
}

export async function getFlightPlansPaginated(
  page: number,
  limit: number
): Promise<PagedFlightPlansResult> {
  try {
    // Calculate the number of pages
    const totalDocs = await FlightPlan.countDocuments();
    const pages = Math.ceil(totalDocs / limit);

    // Calculate the page to retrieve and then get the records
    const skipCount = page * limit;
    const flightPlans = await FlightPlan.find({})
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(limit);

    if (!flightPlans) {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `No flight plans not found.`,
      };
    }

    return {
      success: true,
      data: {
        pages,
        flightPlans,
      },
    };
  } catch (error) {
    logger(`Unable to retrieve flight plans: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to get flight plans: ${error}.`,
    };
  }
}
