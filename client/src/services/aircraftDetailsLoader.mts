import { ActionFunctionArgs, LoaderFunction, ParamParseKey, Params } from "react-router-dom";
import { getAircraftByName } from "./aircraftDetails.mts";
import Result from "../types/result.mts";
import IAircraft from "../interfaces/IAircraft.mts";

const PathNames = {
  name: "/aircraft/name/:name",
} as const;

export type AircraftDetailsLoaderResult = Result<IAircraft[], "NoNameSpecified" | "UnknownError">;

interface Args extends ActionFunctionArgs {
  request: Request;
  params: Params<ParamParseKey<typeof PathNames.name>>;
}

export const aircraftDetailsLoader: LoaderFunction = async ({ params }: Args) => {
  if (params.name) {
    try {
      const aircraftDetails = await getAircraftByName(params.name);

      return {
        success: true,
        data: aircraftDetails,
      } as AircraftDetailsLoaderResult;
    } catch (err) {
      const error = err as Error;
      return {
        success: false,
        errorType: "UnknownError",
        error: error.message,
      } as AircraftDetailsLoaderResult;
    }
  } else {
    return {
      success: false,
      errorType: "NoNameSpecified",
      error: "No aircraft name provided.",
    } as AircraftDetailsLoaderResult;
  }
};
