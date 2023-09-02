import { ActionFunctionArgs, LoaderFunction, ParamParseKey, Params } from "react-router-dom";
import { getVatsimClientTransceivers } from "./clientTransceivers.mts";
import Result from "../types/result.mts";
import { IVatsimClientTransceivers } from "../interfaces/IVatsimClientTransceivers.mts";

const PathNames = {
  callsign: "/transceivers/:callsign",
} as const;

export type ClientTransceiversLoaderResult = Result<
  IVatsimClientTransceivers,
  "NoCallsignSpecified" | "UnknownError"
>;

interface Args extends ActionFunctionArgs {
  request: Request;
  params: Params<ParamParseKey<typeof PathNames.callsign>>;
}

export const clientTransceiversLoader: LoaderFunction = async ({ params }: Args) => {
  if (params.callsign) {
    try {
      const clientTransceivers = await getVatsimClientTransceivers(params.callsign);

      return {
        success: true,
        data: clientTransceivers,
      } as ClientTransceiversLoaderResult;
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        errorType: "UnknownError",
        error: error.message,
      } as ClientTransceiversLoaderResult;
    }
  } else {
    return {
      success: false,
      errorType: "NoCallsignSpecified",
      error: "No callsign provided.",
    } as ClientTransceiversLoaderResult;
  }
};
