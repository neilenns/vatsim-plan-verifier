import { redirect, type ActionFunction } from "react-router";
import AuthorizedAppAction from "../interfaces/AuthorizedAppAction.mts";
import { removeActiveFlightPlan } from "./activeFlightPlans.mts";
import { removeVerifyResults } from "./verifyResults.mts";

async function removeFlightPlan(token: string, flightPlanId: string) {
  if (flightPlanId) {
    await Promise.all([
      removeActiveFlightPlan(token, flightPlanId),
      removeVerifyResults(token, flightPlanId),
    ]);
  }
}

export const appActions =
  ({ getAccessTokenSilently }: AuthorizedAppAction): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "removeFlightPlan") {
      const flightPlanId = formData.get("flightPlanId");
      const selectedFlightPlanId = formData.get("selectedFlightPlanId");

      const token = await getAccessTokenSilently();
      await removeFlightPlan(token, flightPlanId as string);

      if (flightPlanId === selectedFlightPlanId) {
        return redirect("/verifier");
      }
      return null;
    }

    return null;
  };
