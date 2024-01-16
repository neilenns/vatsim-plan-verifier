import { type ActionFunction, json } from "react-router-dom";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { storeFlightPlan } from "../services/flightPlan.mts";
import { runAllVerifiers } from "../services/runAllVerifiers.mts";
import { addActiveFlightPlan, removeActiveFlightPlan } from "../services/activeFlightPlans.mts";
import { removeVerifyResults } from "../services/verifyResults.mts";
import debug from "debug";
import Result from "../types/result.mts";
import { cleanRoute } from "../utils/flightPlanParser";

const logger = debug("plan-verifier:flightPlanVerifyAction");

export type PlanVerifyActionResult = Result<string, "UnknownError">;

export const flightPlanVerifyAction: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();

  // Another place where typescript falls apart and can't be used to strongly type
  // the form data elements. I think, at least.
  const planToSubmit = {
    callsign: formData.get("callsign"),
    pilotName: formData.get("pilotName"),
    rawAircraftType: formData.get("rawAircraftType"),
    departure: formData.get("departure"),
    arrival: formData.get("arrival"),
    squawk: formData.get("squawk"),
    route: cleanRoute((formData.get("route") as string) ?? ""),
    cruiseAltitude: formData.get("cruiseAltitude")?.toString().replace(/^FL/, ""), // In case someone enters the cruise altitude as "FL360"
    remarks: formData.get("remarks"),
    cid: Number(formData.get("cid")),
    flow: formData.get("flow"),
  } as IFlightPlan;

  let storedFlightPlan: IFlightPlan;
  try {
    storedFlightPlan = await storeFlightPlan(planToSubmit);

    if (!storedFlightPlan || !storedFlightPlan._id) {
      throw new Error("Failed to save flight plan.");
    }

    logger(storedFlightPlan);

    if (params.id) {
      await Promise.all([
        removeActiveFlightPlan(params.id, storedFlightPlan.callsign),
        removeVerifyResults(params.id),
      ]);
    }

    await addActiveFlightPlan(storedFlightPlan._id, storedFlightPlan.callsign);

    const verifierResults = await runAllVerifiers(storedFlightPlan);

    if (!verifierResults) {
      throw new Error("Failed to run verifiers.");
    }

    logger(verifierResults);

    return json(
      { success: true, data: storedFlightPlan._id.toString() } as PlanVerifyActionResult,
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    return json(
      { success: false, errorType: "UnknownError", error: error.message } as PlanVerifyActionResult,
      { status: 500 }
    );
  }
};
