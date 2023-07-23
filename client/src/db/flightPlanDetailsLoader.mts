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

export const flightPlanDetailsLoader: LoaderFunction = async ({ params }: Args) => {
  if (params.id) {
    const flightPlan = await getFlightPlan(params.id);
    const verifyResults = await getVerifyResults(params.id);

    // const [flightPlan, verifierResults] = await Promise.all([
    //   getFlightPlan(params.id),
    //   getVerifyResults(params.id),
    // ]);

    return {
      flightPlan,
      verifyResults,
    };
  }
};
