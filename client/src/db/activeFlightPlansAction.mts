import { type ActionFunction } from "react-router-dom";
import { removeActiveFlightPlan } from "./activeFlightPlans.mts";

export const activeFlightPlansAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const flightPlanId = formData.get("flightPlanId") as string;

  if (flightPlanId) {
    await removeActiveFlightPlan(flightPlanId);
  }

  return null;
};
