import { LoaderFunction } from "react-router-dom";
import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";
import axios from "axios";
import { serverUrl } from "../configs/planVerifierServer.mjs";

const controllerId = "5f8a5fb7ebeb775e502b4e7f";

async function getActiveFlightPlans(): Promise<IActiveFlightPlan[] | undefined> {
  try {
    // Send GET request to the Express.js route using Axios
    const response = await axios.get(
      new URL(`activeFlightPlans/${controllerId}`, serverUrl).toString()
    );

    if (response.status === 200) {
      return response.data as IActiveFlightPlan[];
    } else {
      throw new Error("Failed to get active flight plans");
    }
  } catch (error) {
    throw new Error("Failed to get active flight plans");
  }
}

// The lack of a return type on this is infuriating and caused me 30 minutes of wasted time
// because I spelled verifyResults one way here and a different way when useLoaderData() was
// called. There has to be a proper way to do this.
export const activeFlightPlansLoader: LoaderFunction = async () => {
  try {
    const activeFlightPlans = await getActiveFlightPlans();

    return activeFlightPlans;
  } catch {
    return [];
  }
};
