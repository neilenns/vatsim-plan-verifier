import { Types } from "mongoose";
import mainLogger from "../logger.mjs";
import {
  type ActiveFlightPlanDocument,
  ActiveFlightPlanModel,
} from "../models/ActiveFlightPlan.mjs";
import { VerifierResultStatus } from "../models/VerifierResult.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "activeFlightPlanController" });

type ActiveFlightPlanResult = Result<
  ActiveFlightPlanDocument[],
  "NoFlightPlansFound" | "UnknownError"
>;

export async function getActiveFlightPlans(controllerId: string): Promise<ActiveFlightPlanResult> {
  try {
    const findFlightPlansForController =
      // Match documents based on the controllerId
      { $match: { controllerId: new Types.ObjectId(controllerId) } };

    const lookupFlightPlanDetails =
      // Perform a left join with the FlightPlan collection
      {
        $lookup: {
          from: "flightplans", // The collection to join
          localField: "flightPlan",
          foreignField: "_id",
          as: "flightPlanDetails",
        },
      };

    const projectFlightPlanDetails = {
      $project: {
        flightPlanId: "$flightPlanDetails._id",
        callsign: "$flightPlanDetails.callsign",
        departure: "$flightPlanDetails.departure",
        arrival: "$flightPlanDetails.arrival",
      },
    };

    const lookupVerifierResults = {
      $lookup: {
        from: "verifierresults", // The collection to join
        localField: "flightPlanId", // The field from the ActiveFlightPlan collection
        foreignField: "flightPlanId", // The field from the VerifierResults collection
        as: "verifierResults",
      },
    };

    const groupResultsByStatus = {
      $group: {
        _id: {
          flightPlanId: "$flightPlanId",
          callsign: "$callsign",
          departure: "$departure",
          arrival: "$arrival",
          status: "$verifierResults.status", // Group by status field
        },
        count: { $sum: 1 }, // Count the occurrences of each status for each flightPlanId
      },
    };

    const addStatusCounts = {
      $group: {
        _id: {
          flightPlanId: "$_id.flightPlanId",
          callsign: "$_id.callsign",
          departure: "$_id.departure",
          arrival: "$_id.arrival",
        },
        statusCounts: {
          $push: {
            status: "$_id.status",
            count: "$count",
          },
        },
      },
    };

    const projectResult = {
      $project: {
        _id: 0,
        flightPlanId: "$_id.flightPlanId",
        callsign: "$_id.callsign",
        departure: "$_id.departure",
        arrival: "$_id.arrival",
        warningCount: {
          $sum: {
            $cond: [
              {
                $eq: [{ $arrayElemAt: ["$statusCounts.status", 0] }, VerifierResultStatus.WARNING],
              },
              { $arrayElemAt: ["$statusCounts.count", 0] },
              0, // If false, set to 0
            ],
          },
        },
        errorCount: {
          $sum: {
            $cond: [
              { $eq: [{ $arrayElemAt: ["$statusCounts.status", 0] }, VerifierResultStatus.ERROR] },
              { $arrayElemAt: ["$statusCounts.count", 0] },
              0, // If false, set to 0
            ],
          },
        },
        informationCount: {
          $sum: {
            $cond: [
              {
                $eq: [
                  { $arrayElemAt: ["$statusCounts.status", 0] },
                  VerifierResultStatus.INFORMATION,
                ],
              },
              { $arrayElemAt: ["$statusCounts.count", 0] },
              0, // If false, set to 0
            ],
          },
        },
        okCount: {
          $sum: {
            $cond: [
              { $eq: [{ $arrayElemAt: ["$statusCounts.status", 0] }, VerifierResultStatus.OK] },
              { $arrayElemAt: ["$statusCounts.count", 0] },
              0, // If false, set to 0
            ],
          },
        },
      },
    };

    const fetchedPlans = await ActiveFlightPlanModel.aggregate([
      findFlightPlansForController,
      lookupFlightPlanDetails,
      { $unwind: "$flightPlanDetails" },
      projectFlightPlanDetails,
      lookupVerifierResults,
      // See comment on filterOutInfroamtionResults above.
      //      filterOutInformationResults,
      { $unwind: "$verifierResults" },
      groupResultsByStatus,
      addStatusCounts,
      projectResult,
      {
        $sort: {
          callsign: 1,
        },
      },
    ]);

    if (fetchedPlans.length > 0) {
      return { success: true, data: fetchedPlans };
    } else {
      return {
        success: false,
        errorType: "NoFlightPlansFound",
        error: `No flight plans found for controller ${controllerId}.`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(
      `Error fetching flight plans for controller ${controllerId}: ${error.message}`,
      error
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for controller ${controllerId}: ${error.message}`,
    };
  }
}

export async function removeActiveFlightPlan(id: string): Promise<ActiveFlightPlanResult> {
  try {
    await ActiveFlightPlanModel.findByIdAndDelete(id);

    return { success: true, data: [] };
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Unable to remove active flight plan record ${id}.`,
    };
  }
}

export async function removeActiveFlightPlanByIdentifiers(
  controllerId: string,
  flightPlanId: string,
  callsign: string
): Promise<ActiveFlightPlanResult> {
  try {
    await ActiveFlightPlanModel.findOneAndDelete({ controllerId, flightPlan: flightPlanId });
    await ActiveFlightPlanModel.findOneAndDelete({ controllerId, callsign });

    return { success: true, data: [] };
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Unable to remove active flight plan ${flightPlanId}/${callsign}.`,
    };
  }
}

export async function addActiveFlightPlan(
  controllerId: string,
  flightPlanId: string,
  callsign: string
): Promise<ActiveFlightPlanResult> {
  try {
    const newPlan = new ActiveFlightPlanModel({ controllerId, flightPlan: flightPlanId, callsign });
    const savedPlan = await newPlan.save();

    return { success: true, data: [savedPlan] };
  } catch (err) {
    const error = err as Error;
    logger.error(
      `Unable to save active flight plan ${flightPlanId}/${callsign} for controller ${controllerId}: ${error.message}`
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Unable to save active flight plan ${flightPlanId}/${callsign} for controller ${controllerId}: ${error.message}`,
    };
  }
}
