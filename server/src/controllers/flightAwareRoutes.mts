import axios, { AxiosResponse } from "axios";
import { FlightAwareRouteModel, FlightAwareRouteDocument } from "../models/FlightAwareRoute.mjs";
import Result from "../types/result.mjs";
import { ENV } from "../env.mjs";
import debug from "debug";
import { FlightPlan } from "../models/FlightPlan.mjs";

const logger = debug("plan-verifier:flightAwareRoutesController");
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
      logger(`Found cached routes for ${departure}-${arrival}`);

      return {
        success: true,
        data: routes,
      };
    }
  } catch (error) {
    logger(`Error fetching cached routes for ${departure}-${arrival}: ${error}`);
  }

  // create a new FlightAwareRoutesResponse object and initialize the routes to an empty array
  let fetchedRoutes: FlightAwareRoutesResponse = {
    routes: [],
  };

  try {
    fetchedRoutes = await fetchFlightRoutes(departure, arrival);

    if (fetchedRoutes.routes.length === 0) {
      logger(`No routes found for ${departure}-${arrival}`);
    }

    await Promise.all(
      fetchedRoutes.routes.map(async (route) => {
        const newRoute = new FlightAwareRouteModel({
          ...route,
          departure,
          arrival,
        });
        await newRoute.save();
        resultRoutes.push(newRoute);
      })
    );
  } catch (err) {
    const error = err as Error;
    logger(error.message);
    return {
      success: false,
      errorType: "UnknownError",
      error: `${error}`,
    };
  }

  return {
    success: true,
    data: resultRoutes,
  };
}

async function fetchFlightRoutes(
  departure: string,
  arrival: string
): Promise<FlightAwareRoutesResponse> {
  const headers = {
    Accept: "application/json",
    "x-apikey": ENV.FLIGHTAWARE_API_KEY,
  };

  try {
    const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${departure}/routes/${arrival}`;
    const response: AxiosResponse<FlightAwareRoutesResponse> = await axios.get(endpointUrl, {
      headers,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching routes for ${departure}-${arrival}: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching routes for ${departure}-${arrival}: ${error}`);
  }
}
