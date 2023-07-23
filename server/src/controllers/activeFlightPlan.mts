import { Types } from "mongoose";
import ActiveFlightPlan, { IActiveFlightPlan } from "../models/ActiveFlightPlan.mjs";
import Result from "../types/result.mjs";

type ActiveFlightPlanResult = Result<IActiveFlightPlan[], "NoFlightPlansFound" | "UnknownError">;

export async function getActiveFlightPlans(controllerId: string): Promise<ActiveFlightPlanResult> {
  try {
    const fetchedPlans = await ActiveFlightPlan.aggregate([
      // Match documents based on the controllerId
      { $match: { controllerId: new Types.ObjectId(controllerId) } },
      // Perform a left join with the FlightPlan collection
      {
        $lookup: {
          from: "flightplans", // The collection to join
          localField: "flightPlan", // The field from the ActiveFlightPlan collection
          foreignField: "_id", // The field from the FlightPlan collection
          as: "flightPlanDetails", // The alias for the joined documents
        },
      },
      { $unwind: "$flightPlanDetails" },
      {
        $project: {
          flightPlanId: "$flightPlanDetails._id",
          callsign: "$flightPlanDetails.callsign",
          departure: "$flightPlanDetails.departure",
          arrival: "$flightPlanDetails.arrival",
        },
      },
    ]);

    if (fetchedPlans) {
      return { success: true, data: fetchedPlans };
    } else {
      return {
        success: false,
        errorType: "NoFlightPlansFound",
        error: `No flight plans found for controller ${controllerId}.`,
      };
    }
  } catch (error) {
    console.log(`Error fetching flight plans for controller ${controllerId}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for controller ${controllerId}: ${error}`,
    };
  }
}

export async function removeActiveFlightPlan(id: string): Promise<ActiveFlightPlanResult> {
  try {
    await ActiveFlightPlan.findByIdAndDelete(id);

    return { success: true, data: [] };
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Unable to remove active flight plan record ${id}.`,
    };
  }
}

export async function addActiveFlightPlan(
  controllerId: string,
  flightPlanId: string
): Promise<ActiveFlightPlanResult> {
  try {
    const newPlan = new ActiveFlightPlan({ controllerId, flightPlan: flightPlanId });
    const savedPlan = await newPlan.save();

    if (savedPlan) {
      return { success: true, data: [savedPlan] };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unable to save active flight plan ${flightPlanId} for controller ${controllerId}.`,
      };
    }
  } catch (error) {
    console.log(
      `Unable to save active flight plan ${flightPlanId} for controller ${controllerId}: ${error}`
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Unable to save active flight plan ${flightPlanId} for controller ${controllerId}: ${error}`,
    };
  }
}
