import { LoaderFunction } from "react-router-dom";
import { getActiveFlightPlans } from "./activeFlightPlan.mjs";

export const activeFlightPlansLoader: LoaderFunction = async () => {
  try {
    const activeFlightPlans = await getActiveFlightPlans();

    return activeFlightPlans;
  } catch {
    return [];
  }
};
