import { redirect, type ActionFunction } from "react-router-dom";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { storeFlightPlan } from "./flightPlan.mts";
import { runAllVerifiers } from "./runAllVerifiers.mts";

export const flightPlanVerifyAction: ActionFunction = async ({ request }) => {
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

  const verifierResults = await runAllVerifiers(storedFlightPlan);

  if (!verifierResults) {
    throw new Error("Failed to run verifiers");
  }

  return redirect(`/flightPlan/${storedFlightPlan._id.toString()}`);
};
