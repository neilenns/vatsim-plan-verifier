import axios from "axios";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";

export async function runAllVerifiers(flightPlan: IFlightPlan): Promise<IVerifyAllResult> {
  if (!flightPlan || !flightPlan._id) {
    throw new Error("Flight plan is missing an ID.");
  }

  try {
    // Send POST request to the Express.js route using Axios
    const response = await axios.get(
      new URL(`verify/all/${flightPlan._id.toString()}`, serverUrl).toString(),
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data as IVerifyAllResult;
    } else {
      throw new Error("Failed to run all verifiers");
    }
  } catch (error) {
    throw new Error("Failed to run all verifiers");
  }
}