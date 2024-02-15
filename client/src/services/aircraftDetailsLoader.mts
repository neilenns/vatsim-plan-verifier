import { LoaderFunction, LoaderFunctionArgs, ParamParseKey, Params } from "react-router-dom";
import { getAircraftByName } from "./aircraftDetails.mts";
import Result from "../types/result.mts";
import IAircraft from "../interfaces/IAircraft.mts";
import AuthorizedAppAction from "../interfaces/AuthorizedAppAction.mts";

const PathNames = {
  name: "/aircraft/name/:name",
} as const;

export type AircraftDetailsLoaderResult = Result<IAircraft[], "NoNameSpecified" | "UnknownError">;

interface Args extends LoaderFunctionArgs {
  request: Request;
  params: Params<ParamParseKey<typeof PathNames.name>>;
}

export const aircraftDetailsLoader =
  ({ getAccessTokenSilently }: AuthorizedAppAction): LoaderFunction =>
  async ({ request }: Args) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (name) {
      try {
        const token = await getAccessTokenSilently();
        const aircraftDetails = await getAircraftByName(token, name);

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
