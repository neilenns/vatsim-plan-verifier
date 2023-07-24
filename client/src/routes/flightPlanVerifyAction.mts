import { redirect, type ActionFunction } from "react-router-dom";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { storeFlightPlan } from "../services/flightPlan.mts";
import { runAllVerifiers } from "../services/runAllVerifiers.mts";
import { addActiveFlightPlan, removeActiveFlightPlan } from "../services/activeFlightPlans.mts";
import { removeVerifyResults } from "../services/verifyResults.mts";
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
    cruiseAltitude: formData.get("cruiseAltitude"),
  } as IFlightPlan;

  const storedFlightPlan = await storeFlightPlan(planToSubmit);

  if (!storedFlightPlan || !storedFlightPlan._id) {
    throw new Error("Failed to store flight plan");
  }

  if (params.id) {
    await Promise.all([removeActiveFlightPlan(params.id), removeVerifyResults(params.id)]);
  }

  await addActiveFlightPlan(storedFlightPlan._id);

  const verifierResults = await runAllVerifiers(storedFlightPlan);

  if (!verifierResults) {
    throw new Error("Failed to run verifiers");
  }

  return redirect(`/flightPlan/${storedFlightPlan._id.toString()}`);
};
