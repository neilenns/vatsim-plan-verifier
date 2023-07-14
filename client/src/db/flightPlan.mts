import axios from "axios";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { serverUrl } from "../configs/planVerifierServer.mjs";

export async function storeFlightPlan(flightPlan: IFlightPlan) {
  try {
    // Send POST request to the Express.js route using Axios
    const response = await axios.post(
      new URL("flightPlan", serverUrl).toString(),
      flightPlan
    );

    if (response.status === 201) {
      console.log("Flight plan saved!");
    } else {
      throw new Error("Failed to save flight plan");
    }
  } catch (error) {
    throw new Error("Failed to save flight plan");
  }
}
