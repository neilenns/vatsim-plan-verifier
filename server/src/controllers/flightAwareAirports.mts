import FlightPlan from "../interfaces/IFlightPlanDocument.mjs";
import { IFlightAwareAirport } from "../interfaces/flightAware.mjs";
import axios, { AxiosResponse } from "axios";
import FlightAwareAirport from "../models/flightAwareAirport.mjs";

export async function getFlightAwareAirport(
  airportCode: string
): Promise<IFlightAwareAirport | null> {
  try {
    const airport = await FlightAwareAirport.findOne({ airportCode });

    if (airport) {
      console.log(`Found cached airport for ${airportCode}`);
      return airport;
    }
  } catch (error) {
    console.log(`Error fetching cached airport for ${airportCode}: ${error}`);
  }

  var fetchedAirport;

  try {
    fetchedAirport = await fetchAirport(airportCode);

    if (!fetchedAirport) {
      console.log(`No airport found for ${airportCode}`);
    }

    const airport = new FlightAwareAirport({
      ...fetchedAirport,
    });

    await airport.save();
  } catch (error) {
    fetchedAirport = null;
    console.error(error);
  }

  return fetchedAirport;
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
