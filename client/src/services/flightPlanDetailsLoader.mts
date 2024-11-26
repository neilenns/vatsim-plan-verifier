// This nonsense for typing the params comes from

import { ActionFunctionArgs, LoaderFunction, ParamParseKey, Params } from "react-router";
import AuthorizedAppAction from "../interfaces/AuthorizedAppAction.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import { getFlightPlan } from "../services/flightPlan.mts";
import { getVerifyResults } from "../services/verifyResults.mts";
import Result from "../types/result.mts";

// https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
const PathNames = {
  id: "/flightPlan/:id",
} as const;

export type PlanDetailsLoaderResult = Result<
  { flightPlan: IFlightPlan; verifyResults: IVerifyAllResult },
  "NoIdSpecified" | "UnknownError"
>;

interface Args extends ActionFunctionArgs {
  request: Request;
  params: Params<ParamParseKey<typeof PathNames.id>>;
}

// The lack of a return type on this is infuriating and caused me 30 minutes of wasted time
// because I spelled verifyResults one way here and a different way when useLoaderData() was
// called. There has to be a proper way to do this.
export const flightPlanDetailsLoader =
  ({ getAccessTokenSilently }: AuthorizedAppAction): LoaderFunction =>
  async ({ request, params }: Args) => {
    if (request.url.endsWith("new")) {
      return {
        success: true,
        data: {
          flightPlan: {},
        },
      } as PlanDetailsLoaderResult;
    }

    if (params.id) {
      try {
        const token = await getAccessTokenSilently();
        const [flightPlan, verifyResults] = await Promise.all([
          getFlightPlan(token, params.id),
          getVerifyResults(token, params.id),
        ]);

        return {
          success: true,
          data: { flightPlan, verifyResults },
        } as PlanDetailsLoaderResult;
      } catch (err) {
        const error = err as Error;
        return {
          success: false,
          errorType: "UnknownError",
          error: error.message,
        } as PlanDetailsLoaderResult;
      }
    } else {
      return {
        success: false,
        errorType: "NoIdSpecified",
        error: "No flight plan ID provided.",
      };
    }
  };
