import { caching } from "cache-manager";
import { IFlightPlan } from "../models/flightPlan.mjs";
import { FlightAwareRoute } from "../interfaces/flightAware";
import axios, { AxiosResponse } from "axios";

// Cache in memory for 10 minutes, max 500 items
const cache = await caching("memory", { ttl: 10 * 60 * 1000, max: 500 });

export async function getFlightAwareRoutes({
  departure,
  arrival,
}: IFlightPlan): Promise<FlightAwareRoute[]> {
  const cacheKey = `flightRoutes:${departure}-${arrival}`;

  const routes = await cache.get<FlightAwareRoute[]>(cacheKey);
  if (routes) {
    console.log(`Found cached routes for ${departure}-${arrival}`);
    return routes;
  }

  var fetchedRoutes: FlightAwareRoute[] = [];

  try {
    fetchedRoutes = await fetchFlightRoutes(departure, arrival);

    if (fetchedRoutes.length === 0) {
      console.log(`No routes found for ${departure}-${arrival}`);
    }

    await cache.set(cacheKey, fetchedRoutes);
  } catch (error) {
    console.error(error);
  }

  return fetchedRoutes;
}

async function fetchFlightRoutes(
  departure: string,
  arrival: string
): Promise<FlightAwareRoute[]> {
  if (!process.env.FLIGHTAWARE_API_KEY) {
    throw new Error("No FlightAware API key found");
  }

  const headers = {
    Accept: "application/json",
    "x-apikey": process.env.FLIGHTAWARE_API_KEY,
  };

  try {
    const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${departure}/routes/${arrival}`;
    var response: AxiosResponse<FlightAwareRoute[]> = await axios.get(
      endpointUrl,
      { headers }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error fetching routes for ${departure}-${arrival}: ${response.status}`
      );
    }
  } catch (error) {
    throw new Error(
      `Error fetching routes for ${departure}-${arrival}: ${error}`
    );
  }
}
