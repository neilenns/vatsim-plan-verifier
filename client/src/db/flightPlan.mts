import axios from "axios";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import { ActionFunctionArgs, LoaderFunction, ParamParseKey, Params } from "react-router-dom";

export async function storeFlightPlan(flightPlan: IFlightPlan): Promise<IFlightPlan> {
  try {
    // Send POST request to the Express.js route using Axios
    const response = await axios.post(new URL("flightPlan", serverUrl).toString(), flightPlan);

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
    const response = await axios.get(new URL(`flightPlan/${id}`, serverUrl).toString());

    if (response.status === 200) {
      return response.data as IFlightPlan;
    } else {
      throw new Error("Failed to get flight plan");
    }
  } catch (error) {
    throw new Error("Failed to get flight plan");
  }
}

// This nonsense for typing the params comes from
// https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
const PathNames = {
  id: "/flightflightPlan/:id",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.id>>;
}

export const flightPlanLoader: LoaderFunction = async ({ params }: Args) => {
  if (params.id) {
    return await getFlightPlan(params.id);
  }
};
