import { type ActionFunction, json } from "react-router-dom";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { storeFlightPlan } from "../services/flightPlan.mts";
import { runAllVerifiers } from "../services/runAllVerifiers.mts";
import { addActiveFlightPlan, removeActiveFlightPlan } from "../services/activeFlightPlans.mts";
import { removeVerifyResults } from "../services/verifyResults.mts";
import debug from "debug";

const logger = debug("plan-verifier:flightPlanVerifyAction");

export const flightPlanVerifyAction: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();

  // Another place where typescript falls apart and can't be used to strongly type
  // the form data elements. I think, at least.
  const planToSubmit = {
    callsign: formData.get("callsign"),
    rawAircraftType: formData.get("rawAircraftType"),
    departure: formData.get("departure"),
    arrival: formData.get("arrival"),
    squawk: formData.get("squawk"),
    route: formData.get("route"),
    cruiseAltitude: formData.get("cruiseAltitude")?.toString().replace(/^FL/, ""), // In case someone enters the cruise altitude as "FL360"
  } as IFlightPlan;

  let storedFlightPlan: IFlightPlan;
  try {
    storedFlightPlan = await storeFlightPlan(planToSubmit);

    if (!storedFlightPlan || !storedFlightPlan._id) {
      throw new Error("Failed to save flight plan.");
    }

    logger(storedFlightPlan);

    if (params.id) {
      await Promise.all([removeActiveFlightPlan(params.id), removeVerifyResults(params.id)]);
    }

    await addActiveFlightPlan(storedFlightPlan._id);

    const verifierResults = await runAllVerifiers(storedFlightPlan);

    if (!verifierResults) {
      throw new Error("Failed to run verifiers.");
    }

    logger(verifierResults);

    return json({ data: storedFlightPlan._id.toString() }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    return json({ error: error.message }, { status: 500 });
  }
};
