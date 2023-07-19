import { Types } from "mongoose";
import VerifierResult from "../models/VerifierResult.mjs";

export interface FlightPlanPartStatusCounts {
  flightPlanPart: string;
  count: number;
  statusCounts: Array<{
    status: string;
    count: number;
  }>;
}

export async function getStatusCounts(
  id: string
): Promise<FlightPlanPartStatusCounts[]> {
  try {
    const pipeline = [
      {
        $match: { flightPlanId: new Types.ObjectId(id) },
      },
      {
        $group: {
          _id: {
            flightPlanPart: "$flightPlanPart",
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.flightPlanPart",
          statusCounts: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
          totalCount: { $sum: "$count" }, // Calculate the total count for each flightPlanPart
        },
      },
      {
        $project: {
          flightPlanPart: "$_id", // Rename the _id field to flightPlanPart
          count: "$totalCount", // Keep the totalCount field as it is
          statusCounts: 1, // Keep the statusCounts field as it is
          _id: 0, // Exclude the original _id field from the result
        },
      },
    ];

    const result = await VerifierResult.aggregate(pipeline);
    return result;
  } catch (error) {
    console.error("Error fetching status counts:", error);
    throw error;
  }
}
