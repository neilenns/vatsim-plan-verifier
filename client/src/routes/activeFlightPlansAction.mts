import { type ActionFunction } from "react-router-dom";
import { removeActiveFlightPlan } from "../services/activeFlightPlans.mts";
import { removeVerifyResults } from "../services/verifyResults.mts";

export const activeFlightPlansAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const flightPlanId = formData.get("flightPlanId") as string;

  if (flightPlanId) {
    await Promise.all([removeActiveFlightPlan(flightPlanId), removeVerifyResults(flightPlanId)]);
  }

  return null;
};
