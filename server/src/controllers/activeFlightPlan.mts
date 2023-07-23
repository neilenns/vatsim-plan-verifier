import ActiveFlightPlan, { IActiveFlightPlan } from "../models/ActiveFlightPlan.mjs";
import Result from "../types/result.mjs";

type ActiveFlightPlanResult = Result<IActiveFlightPlan[], "NoFlightPlansFound" | "UnknownError">;

export async function getActiveFlightPlans(controllerId: string): Promise<ActiveFlightPlanResult> {
  try {
    const fetchedPlans = await ActiveFlightPlan.find({ controllerId })
      .populate({
        path: "flightPlan",
        select: "callsign departure arrival",
      })
      .lean() // Prevents virtuals
      .exec();

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
