import axios, { AxiosResponse } from "axios";
import AirportInfoModel, { IAirportInfo } from "../models/AirportInfo.mjs";
import Result from "../types/result.mjs";
import { ENV } from "../env.mjs";
import debug from "debug";

const logger = debug("plan-verifier:getAirportInfoController");
type AirportInfoResult = Result<IAirportInfo, "AirportNotFound" | "UnknownError">;

export async function getAirportInfo(airportCode: string): Promise<AirportInfoResult> {
  try {
    const airport = await AirportInfoModel.findOne({ airportCode });

    if (airport) {
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
      logger(`No airport found for ${airportCode}`);
      return {
        success: false,
        errorType: "AirportNotFound",
        error: `No airport found for ${airportCode}`,
      };
    }

    const airport = new AirportInfoModel({
      ...fetchedAirport,
    });

    await airport.save();
    return {
      success: true,
      data: airport,
    };
  } catch (err) {
    const error = err as Error;
    logger(error.message);
    return {
      success: false,
      errorType: "UnknownError",
      error: `${error}`,
    };
  }
}

async function fetchAirport(airportCode: string): Promise<IAirportInfo> {
  const headers = {
    Accept: "application/json",
    "x-apikey": ENV.FLIGHTAWARE_API_KEY,
  };

  try {
    const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${airportCode}`;
    const response: AxiosResponse<IAirportInfo> = await axios.get(endpointUrl, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching airport information for ${airportCode}: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching airport information for ${airportCode}: ${error}`);
  }
}
