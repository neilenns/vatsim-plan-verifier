import FlightPlan from "../interfaces/IFlightPlanDocument.mjs";
import axios, { AxiosResponse } from "axios";
import FlightAwareRoute, {
  IFlightAwareRoute,
} from "../models/FlightAwareRoute.mjs";
import Result from "../types/result.mjs";

type FlightAwareRoutesResult = Result<IFlightAwareRoute[], "UnknownError">;

interface FlightAwareRoutesResponse {
  routes: IFlightAwareRoute[];
}

export async function getFlightAwareRoutes({
  departure,
  arrival,
}: Partial<FlightPlan>): Promise<FlightAwareRoutesResult> {
  const resultRoutes: IFlightAwareRoute[] = [];

  if (!departure || !arrival) {
    throw new Error("Missing departure or arrival");
  }

  try {
    const routes = await FlightAwareRoute.find({ departure, arrival });

    if (routes && routes.length > 0) {
      console.log(`Found cached routes for ${departure}-${arrival}`);

      return {
        success: true,
        data: routes,
      };
    }
  } catch (error) {
    console.error(
      `Error fetching cached routes for ${departure}-${arrival}: ${error}`
    );
  }

  // create a new FlightAwareRoutesResponse object and initialize the routes to an empty array
  var fetchedRoutes: FlightAwareRoutesResponse = {
    routes: [],
  };

  try {
    fetchedRoutes = await fetchFlightRoutes(departure, arrival);

    if (fetchedRoutes.routes.length === 0) {
      console.log(`No routes found for ${departure}-${arrival}`);
    }

    await Promise.all(
      fetchedRoutes.routes.map(async (route) => {
        const newRoute = new FlightAwareRoute({
          ...route,
          departure,
          arrival,
        });
        await newRoute.save();
        resultRoutes.push(newRoute);
      })
    );
  } catch (error) {
    console.error(error);
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
  if (!process.env.FLIGHTAWARE_API_KEY) {
    throw new Error("No FlightAware API key found");
  }

  const headers = {
    Accept: "application/json",
    "x-apikey": process.env.FLIGHTAWARE_API_KEY,
  };

  try {
    const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${departure}/routes/${arrival}`;
    var response: AxiosResponse<FlightAwareRoutesResponse> = await axios.get(
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
