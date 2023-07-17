import axios from "axios";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import IVerifierResultDocument from "../interfaces/IVerifierResultDocument.mts";

export async function runAllVerifiers(
  flightPlan: IFlightPlan
): Promise<IVerifierResultDocument[]> {
  if (!flightPlan || !flightPlan._id) {
    throw new Error("Flight plan is missing an ID.");
  }

  try {
    // Send POST request to the Express.js route using Axios
    const response = await axios.get(
      new URL(`verify/all/${flightPlan._id.toString()}`, serverUrl).toString()
    );

    if (response.status === 200) {
      return response.data as IVerifierResultDocument[];
    } else {
      throw new Error("Failed to run all verifiers");
    }
  } catch (error) {
    throw new Error("Failed to run all verifiers");
  }
}
