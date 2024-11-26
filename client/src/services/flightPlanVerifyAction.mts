import debug from "debug";
import { type ActionFunction } from "react-router-dom";
import AuthorizedAppAction from "../interfaces/AuthorizedAppAction.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { addActiveFlightPlan, removeActiveFlightPlan } from "../services/activeFlightPlans.mts";
import { storeFlightPlan } from "../services/flightPlan.mts";
import { runAllVerifiers } from "../services/runAllVerifiers.mts";
import { removeVerifyResults } from "../services/verifyResults.mts";
import Result from "../types/result.mts";
import { cleanRoute } from "../utils/flightPlanParser";

const logger = debug("plan-verifier:flightPlanVerifyAction");

export type PlanVerifyActionResult = Result<string, "UnknownError">;

export const flightPlanVerifyAction =
  ({ getAccessTokenSilently }: AuthorizedAppAction): ActionFunction =>
  async ({ params, request }) => {
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
      route: cleanRoute(formData.get("route") as string),
      cruiseAltitude: formData.get("cruiseAltitude")?.toString().replace(/^FL/, ""), // In case someone enters the cruise altitude as "FL360"
      remarks: formData.get("remarks"),
      cid: Number(formData.get("cid")),
      flow: formData.get("flow"),
      communicationMethod: formData.get("communicationMethod"),
    } as IFlightPlan;

    let storedFlightPlan: IFlightPlan;
    try {
      const token = await getAccessTokenSilently();
      storedFlightPlan = await storeFlightPlan(token, planToSubmit);

      if (!storedFlightPlan._id) {
        throw new Error("Failed to save flight plan.");
      }

      logger(storedFlightPlan);

      if (params.id) {
        await Promise.all([
          removeActiveFlightPlan(token, params.id, storedFlightPlan.callsign),
          removeVerifyResults(token, params.id),
        ]);
      }

      await addActiveFlightPlan(token, storedFlightPlan._id, storedFlightPlan.callsign);

      const verifierResults = await runAllVerifiers(token, storedFlightPlan);

      logger(verifierResults);

      return Response.json(
        { success: true, data: storedFlightPlan._id.toString() } as PlanVerifyActionResult,
        { status: 200 }
      );
    } catch (err) {
      const error = err as Error;
      return Response.json(
        {
          success: false,
          errorType: "UnknownError",
          error: error.message,
        } as PlanVerifyActionResult,
        { status: 500 }
      );
    }
  };
