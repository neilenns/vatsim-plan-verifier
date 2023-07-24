import { LoaderFunction } from "react-router-dom";
import { getActiveFlightPlans } from "../services/activeFlightPlans.mjs";

export const activeFlightPlansLoader: LoaderFunction = async () => {
  try {
    const activeFlightPlans = await getActiveFlightPlans();

    return activeFlightPlans;
  } catch {
    return [];
  }
};
