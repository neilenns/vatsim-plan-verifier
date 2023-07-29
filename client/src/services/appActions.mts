import { redirect, type ActionFunction } from "react-router-dom";
import { removeActiveFlightPlan } from "./activeFlightPlans.mts";
import { removeVerifyResults } from "./verifyResults.mts";
import axios from "axios";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import { serverUrl } from "../configs/planVerifierServer.mts";
import debug from "debug";

const logger = debug("plan-verifier:appActions");

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
