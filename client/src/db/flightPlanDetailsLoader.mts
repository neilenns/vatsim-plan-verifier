// This nonsense for typing the params comes from

import { ActionFunctionArgs, Params, ParamParseKey, LoaderFunction } from "react-router-dom";
import { getFlightPlan } from "./flightPlan.mts";
import { getVerifyResults } from "./verifyResults.mts";

// https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
const PathNames = {
  id: "/flightPlan/:id",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.id>>;
}

// The lack of a return type on this is infuriating and caused me 30 minutes of wasted time
// because I spelled verifyResults one way here and a different way when useLoaderData() was
// called. There has to be a proper way to do this.
export const flightPlanDetailsLoader: LoaderFunction = async ({ params }: Args) => {
  if (params.id) {
    const [flightPlan, verifyResults] = await Promise.all([
      getFlightPlan(params.id),
      getVerifyResults(params.id),
    ]);

    return {
      flightPlan,
      verifyResults,
    };
  }
};
