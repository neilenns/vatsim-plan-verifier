import axios, { AxiosResponse } from "axios";
import pluralize from "pluralize";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";
import { FlightAwareRouteDocument, FlightAwareRouteModel } from "../models/FlightAwareRoute.mjs";
import { FlightPlan } from "../models/FlightPlan.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "flightAwareRoutes" });

type FlightAwareRoutesResult = Result<FlightAwareRouteDocument[], "UnknownError">;

interface FlightAwareRoutesResponse {
  routes: FlightAwareRouteDocument[];
}

export async function getFlightAwareRoutes({
  departure,
  arrival,
}: Partial<FlightPlan>): Promise<FlightAwareRoutesResult> {
  const resultRoutes: FlightAwareRouteDocument[] = [];

  if (!departure || !arrival) {
    throw new Error("Missing departure or arrival");
  }

  try {
    const routes = await FlightAwareRouteModel.find({ departure, arrival });

    if (routes && routes.length > 0) {
      logger.debug(`Found cached routes for ${departure}-${arrival}`);

      return {
        success: true,
        data: routes,
      };
    }
  } catch (error) {
    logger.error(`Error fetching cached routes for ${departure}-${arrival}: ${error}`);
  }

  // create a new FlightAwareRoutesResponse object and initialize the routes to an empty array
  let fetchedRoutes: FlightAwareRoutesResponse = {
    routes: [],
  };

  try {
    fetchedRoutes = await fetchFlightRoutes(departure, arrival);

    const resultRoutes = fetchedRoutes.routes.map((route) => {
      return new FlightAwareRouteModel({
        ...route,
        departure,
        arrival,
      });
    });

    await FlightAwareRouteModel.bulkSave(resultRoutes);

    return {
      success: true,
      data: resultRoutes,
    };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    return {
      success: false,
      errorType: "UnknownError",
      error: `${error}`,
    };
  }
}

async function fetchFlightRoutes(
  departure: string,
  arrival: string
): Promise<FlightAwareRoutesResponse> {
  const headers = {
    Accept: "application/json",
    "x-apikey": ENV.FLIGHTAWARE_API_KEY,
  };

  const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${departure}/routes/${arrival}`;

  try {
    logger.debug(`Fetching FlightAware routes for ${departure}-${arrival}`, {
      url: endpointUrl,
    });
    const response: AxiosResponse<FlightAwareRoutesResponse> = await axios.get(endpointUrl, {
      headers,
    });

    if (response.status === 200) {
      logger.debug(
        `Fetched ${pluralize(
          "route",
          response.data.routes.length,
          true
        )} for ${departure}-${arrival}`,
        {
          url: endpointUrl,
        }
      );
      return response.data;
    } else {
      logger.error(`Error fetching routes for ${departure}-${arrival}: ${response.status}`, {
        url: endpointUrl,
      });
      throw new Error(`Error fetching routes for ${departure}-${arrival}: ${response.status}`);
    }
  } catch (error) {
    logger.error(`Error fetching routes for ${departure}-${arrival}: ${error}`, {
      url: endpointUrl,
    });
    throw new Error(`Error fetching routes for ${departure}-${arrival}: ${error}`);
  }
}
