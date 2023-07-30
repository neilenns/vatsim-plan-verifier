import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import http from "../utils/http.mts";

export async function runAllVerifiers(flightPlan: IFlightPlan): Promise<IVerifyAllResult> {
  if (!flightPlan || !flightPlan._id) {
    throw new Error("Flight plan is missing an ID.");
  }

  try {
    const response = await http.get(`verify/all/${flightPlan._id.toString()}`);

    if (response.status === 200) {
      return response.data as IVerifyAllResult;
    } else {
      throw new Error("Failed to run all verifiers");
    }
  } catch (error) {
    throw new Error("Failed to run all verifiers");
  }
}
