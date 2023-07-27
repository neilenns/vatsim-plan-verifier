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

async function logout() {
  await axios
    .get<ILoginResponse>(new URL("logout", serverUrl).toString(), {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    })
    .catch(() => {
      logger("User is already logged out.");
    }) // We don't have to do anything on errors.
    .finally(() => {
      localStorage.removeItem("token");
      localStorage.setItem("logout", Date.now().toString());
    });
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
  } else if (intent === "logout") {
    await logout();

    return redirect("/login");
  }

  return null;
};
