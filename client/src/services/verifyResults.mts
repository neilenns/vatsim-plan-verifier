import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import http from "../utils/http.mts";

export async function getVerifyResults(
  token: string,
  flightPlanId: string
): Promise<IVerifyAllResult> {
  try {
    const response = await http.authorized(token).get(`verify/results/${flightPlanId}`);

    if (response.status === 201) {
      return response.data as IVerifyAllResult;
    } else {
      throw new Error("Failed to save flight plan");
    }
  } catch (error) {
    throw new Error("Failed to save flight plan");
  }
}

export async function removeVerifyResults(token: string, flightPlanId: string): Promise<void> {
  try {
    const response = await http.authorized(token).delete(`verify/results/${flightPlanId}`);

    if (response.status === 200) {
      return;
    } else {
      throw new Error("Failed to delete verification results");
    }
  } catch (error) {
    throw new Error("Failed to delete verification results");
  }
}
