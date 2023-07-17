import axios, { AxiosResponse } from "axios";
import FlightAwareAirport, {
  IFlightAwareAirport,
} from "../models/FlightAwareAirport.mjs";
import Result from "../types/result.mjs";

type FlightAwareAirportResult = Result<
  IFlightAwareAirport,
  "AirportNotFound" | "UnknownError"
>;

export async function getFlightAwareAirport(
  airportCode: string
): Promise<FlightAwareAirportResult> {
  try {
    const airport = await FlightAwareAirport.findOne({ airportCode });

    if (airport) {
      console.log(`Found cached airport for ${airportCode}`);
      return {
        success: true,
        data: airport,
      };
    }
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching cached airport for ${airportCode}: ${error}`,
    };
  }

  try {
    const fetchedAirport = await fetchAirport(airportCode);

    if (!fetchedAirport) {
      console.log(`No airport found for ${airportCode}`);
      return {
        success: false,
        errorType: "AirportNotFound",
        error: `No airport found for ${airportCode}`,
      };
    }

    const airport = new FlightAwareAirport({
      ...fetchedAirport,
    });

    await airport.save();
    return {
      success: true,
      data: airport,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorType: "UnknownError",
      error: `${error}`,
    };
  }
}

async function fetchAirport(airportCode: string): Promise<IFlightAwareAirport> {
  if (!process.env.FLIGHTAWARE_API_KEY) {
    throw new Error("No FlightAware API key found");
  }

  const headers = {
    Accept: "application/json",
    "x-apikey": process.env.FLIGHTAWARE_API_KEY,
  };

  try {
    const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${airportCode}`;
    var response: AxiosResponse<IFlightAwareAirport> = await axios.get(
      endpointUrl,
      { headers }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error fetching airport information for ${airportCode}: ${response.status}`
      );
    }
  } catch (error) {
    throw new Error(
      `Error fetching airport information for ${airportCode}: ${error}`
    );
  }
}
