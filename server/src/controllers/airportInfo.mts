import axios, { AxiosResponse } from "axios";
import AirportInfoModel from "../models/AirportInfo.mjs";
import Result from "../types/result.mjs";
import { ENV } from "../env.mjs";
import debug from "debug";
import airportJson from "./free_airports.json" assert { type: "json" };
import { IAvioWikiAirport } from "../interfaces/IAvioWikiAirport.mjs";
import AdmZip from "adm-zip";
import { DocumentType } from "@typegoose/typegoose";
import { json } from "stream/consumers";
import { AirportInfoClass } from "../models/AirportInfo.mjs";

const logger = debug("plan-verifier:getAirportInfoController");
type AirportInfoResult = Result<DocumentType<AirportInfoClass>, "AirportNotFound" | "UnknownError">;
type FetchAvioWikiAirportsResult = Result<number, "UnknownError">;

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
    const fetchedAirport = await fetchAirportFromFlightAware(airportCode);

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

async function fetchAirportFromFlightAware(airportCode: string): Promise<AirportInfoClass> {
  const headers = {
    Accept: "application/json",
    "x-apikey": ENV.FLIGHTAWARE_API_KEY,
  };

  try {
    const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${airportCode}`;
    const response: AxiosResponse<AirportInfoClass> = await axios.get(endpointUrl, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching airport information for ${airportCode}: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching airport information for ${airportCode}: ${error}`);
  }
}

// Downloads the zip file of airprort info from AvioWiki, extracts it, and converts it
// to an array of IAirportInfo for later use.
export async function fetchAirportsFromAvioWiki(): Promise<FetchAvioWikiAirportsResult> {
  try {
    logger("Downloading and extracting airport information from AvioWiki");
    const zippedResponse = await axios.get("https://exports.aviowiki.com/free_airports.json.zip", {
      responseType: "arraybuffer",
    });
    const zipBuffer = Buffer.from(zippedResponse.data);
    const zip = new AdmZip(zipBuffer);
    const jsonData = JSON.parse(zip.readAsText(zip.getEntries()[0])) as IAvioWikiAirport[];

    const models = jsonData
      // There's lots of entries that don't have any airport code, which is the index used in the local
      // database. Skip importing those airports.
      .filter((airport) => airport.icao || airport.iata || airport.localIdentifier)
      // Convert all the incoming data to AirportInfoModels
      .map((airport) => {
        if (!airport.icao && !airport.iata && !airport.localIdentifier) {
          logger(`Skipping ${airport.name} because it has no ICAO, IATA, or local identifier`);
        }

        return new AirportInfoModel({
          airportCode: airport.icao ?? airport.iata ?? airport.localIdentifier,
          icaoCode: airport.icao ?? undefined,
          iataCode: airport.iata ?? undefined,
          name: airport.name ?? undefined,
          city: airport.servedCity ?? undefined,
          state: airport.servedCityGoverningDistrict?.name ?? undefined,
          latitude: airport.coordinates?.latitude ?? undefined,
          longitude: airport.coordinates?.longitude ?? undefined,
          timezone: airport.timeZone ?? undefined,
          countryCode: airport.country?.iso2 ?? airport.country?.iso3 ?? undefined,
        });
      });

    logger(`Saving ${models.length} airports to database`);
    // Save the world. Good god.
    await AirportInfoModel.deleteMany({});
    await Promise.all(
      models.map(async (model) => {
        try {
          await model.save();
        } catch (err) {
          const error = err as Error;
          logger(`Unable to save ${model.name} to database: ${error.message}. Skipping.`);
        }
      })
    );
    logger(`Done!`);

    return {
      success: true,
      data: models.length,
    };
  } catch (error) {
    throw new Error(`Error downloading and extracting airport information from AvioWiki: ${error}`);
  }
}
