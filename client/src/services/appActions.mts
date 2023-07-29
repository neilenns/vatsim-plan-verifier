import { redirect, type ActionFunction } from "react-router-dom";
import { removeActiveFlightPlan } from "./activeFlightPlans.mts";
import { removeVerifyResults } from "./verifyResults.mts";

async function removeFlightPlan(flightPlanId: string) {
  if (flightPlanId) {
    await Promise.all([removeActiveFlightPlan(flightPlanId), removeVerifyResults(flightPlanId)]);
  }
}

export const appActions: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "removeFlightPlan") {
    const flightPlanId = formData.get("flightPlanId");
    const selectedFlightPlanId = formData.get("selectedFlightPlanId");
    await removeFlightPlan(flightPlanId as string);

    if (flightPlanId === selectedFlightPlanId) {
      return redirect("/verifier");
    }
    return null;
  }

  return null;
};
