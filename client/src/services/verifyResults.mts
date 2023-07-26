import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import http from "../utils/http.mts";

export async function getVerifyResults(flightPlanId: string): Promise<IVerifyAllResult> {
  try {
    // Send POST request to the Express.js route using Axios
    const response = await http.get(`verify/results/${flightPlanId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

    if (response.status === 201) {
      return response.data as IVerifyAllResult;
    } else {
      throw new Error("Failed to save flight plan");
    }
  } catch (error) {
    throw new Error("Failed to save flight plan");
  }
}

export async function removeVerifyResults(flightPlanId: string): Promise<void> {
  try {
    const response = await http.delete(`verify/results/${flightPlanId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

    if (response.status === 200) {
      return;
    } else {
      throw new Error("Failed to delete verification results");
    }
  } catch (error) {
    throw new Error("Failed to delete verification results");
  }
}
