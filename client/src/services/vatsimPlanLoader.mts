import { ActionFunctionArgs, Params, ParamParseKey, LoaderFunction } from "react-router-dom";
import Result from "../types/result.mts";
import { IVatsimFlightPlan } from "../interfaces/IVatsimFlightPlan.mts";
import { getVatsimFlightPlan } from "./vatsim.mts";

// https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
const PathNames = {
  id: "/flightstrip/:callsign",
} as const;

export type VatsimPlanLoaderResult = Result<
  IVatsimFlightPlan,
  "NoCallsignSpecified" | "UnknownError"
>;

interface Args extends ActionFunctionArgs {
  request: Request;
  params: Params<ParamParseKey<typeof PathNames.id>>;
}

// The lack of a return type on this is infuriating and caused me 30 minutes of wasted time
// because I spelled verifyResults one way here and a different way when useLoaderData() was
// called. There has to be a proper way to do this.
export const vatsimPlanLoader: LoaderFunction = async ({ params }: Args) => {
  if (params.callsign) {
    try {
      const flightPlan = await getVatsimFlightPlan(params.callsign);

      return {
        success: true,
        data: flightPlan,
      } as VatsimPlanLoaderResult;
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        errorType: "UnknownError",
        error: error.message,
      } as VatsimPlanLoaderResult;
    }
  } else {
    return {
      success: false,
      errorType: "NoCallsignSpecified",
      error: "No callsign provided.",
    };
  }
};
