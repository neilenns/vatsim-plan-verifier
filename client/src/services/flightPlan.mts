import axios from "axios";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { serverUrl } from "../configs/planVerifierServer.mjs";

export async function storeFlightPlan(flightPlan: IFlightPlan): Promise<IFlightPlan> {
  try {
    // Send POST request to the Express.js route using Axios
    const response = await axios.post(new URL("flightPlan", serverUrl).toString(), flightPlan, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

    if (response.status === 201) {
      return response.data as IFlightPlan;
    } else {
      throw new Error("Failed to save flight plan");
    }
  } catch (error) {
    throw new Error("Failed to save flight plan");
  }
}

export async function getFlightPlan(id: string): Promise<IFlightPlan | undefined> {
  try {
    // Send GET request to the Express.js route using Axios
    const response = await axios.get(new URL(`flightPlan/${id}`, serverUrl).toString(), {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

    if (response.status === 200) {
      return response.data as IFlightPlan;
    } else {
      throw new Error("Failed to get flight plan");
    }
  } catch (error) {
    throw new Error("Failed to get flight plan");
  }
}
