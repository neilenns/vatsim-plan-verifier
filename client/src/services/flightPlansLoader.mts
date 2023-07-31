// This nonsense for typing the params comes from

import { LoaderFunction } from "react-router-dom";
import { getFlightPlans } from "./flightPlan.mts";

export const flightPlansLoader: LoaderFunction = async () => {
  try {
    const flightPlans = await getFlightPlans();

    return flightPlans;
  } catch {
    return {};
  }
};
