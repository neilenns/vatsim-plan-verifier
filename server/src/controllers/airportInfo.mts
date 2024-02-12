import AdmZip from "adm-zip";
import axios, { AxiosError, AxiosResponse } from "axios";
import winston from "winston";
import { CacheManager } from "../cacheManager.mjs";
import { ENV } from "../env.mjs";
import { IAvioWikiAirport } from "../interfaces/IAvioWikiAirport.mjs";
import mainLogger from "../logger.mjs";
import { AirportInfoDocument, AirportInfoModel } from "../models/AirportInfo.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "airportInfo" });
const cache = CacheManager.getInstance<AirportInfoDocument>("airportInfo");

type AirportInfoResult = Result<AirportInfoDocument, "AirportNotFound" | "UnknownError">;
type FetchAvioWikiAirportsResult = Result<number, "UnknownError">;

export async function getAirportInfo(airportCode: string): Promise<AirportInfoResult> {
  try {
    let airport: AirportInfoDocument | null = null;

    airport = cache.get(airportCode);

    if (!airport) {
      airport = await AirportInfoModel.findOne({ airportCode });
      if (airport) {
        cache.set(airportCode, airport);
      }
    }

    // Airports with blank names are placeholders indicating it doesn't exist to prevent repeated checks with
    // FlightAware
    if (airport?.name) {
      return {
        success: true,
        data: airport,
      };
    } else {
      return {
        success: false,
        errorType: "AirportNotFound",
        error: `No airport found for ${airportCode}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching cached airport for ${airportCode}: ${error}`,
    };
  }
}

/**
 * Fetches airport information from the FlightAware aeroapi.
 * @param airportCode The airport code for the airport to look up
 * @returns The airport information, or undefined if the airport wasn't found
 */
async function fetchAirportFromFlightAware(
  airportCode: string
): Promise<AirportInfoDocument | undefined> {
  const headers = {
    Accept: "application/json",
    "x-apikey": ENV.FLIGHTAWARE_API_KEY,
  };

  const endpointUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${airportCode}`;

  if (!ENV.GET_AIRPORT_INFO_FROM_FLIGHT_AWARE) {
    throw new Error(`Fetching airport information from FlightAware is disabled.`);
  }

  try {
    logger.debug(`Fetching FlightAware airport info for ${airportCode}`, {
      url: endpointUrl,
    });
    const response: AxiosResponse<AirportInfoDocument> = await axios.get(endpointUrl, { headers });

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 429) {
      logger.error(
        `Error fetching airport information for ${airportCode}: too many requests. ${response.headers["Retry-After"]}`,
        {
          url: endpointUrl,
        }
      );
      return undefined;
    } else {
      logger.error(`Error fetching airport information for ${airportCode}: ${response.status}`, {
        url: endpointUrl,
      });

      throw new Error(`Error fetching airport information for ${airportCode}: ${response.status}`);
    }
  } catch (error) {
    // 400 error is thrown if the airport wasn't found, so in that case specifically return undefined
    // instead of throwing another error.
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return undefined;
      }
    }
    const err = error as Error;
    logger.error(`Error fetching airport information for ${airportCode}: ${err.message}`, {
      url: endpointUrl,
    });

    throw new Error(`Error fetching airport information for ${airportCode}: ${err.message}`);
  }
}

// Downloads the zip file of airprort info from AvioWiki, extracts it, and converts it
// to an array of IAirportInfo for later use.
export async function fetchAirportsFromAvioWiki(): Promise<FetchAvioWikiAirportsResult> {
  try {
    let profiler: winston.Profiler;

    logger.info("Downloading and extracting airport information from AvioWiki");
    profiler = logger.startTimer();

    const zippedResponse = await axios.get("https://exports.aviowiki.com/free_airports.json.zip", {
      responseType: "arraybuffer",
    });
    const zipBuffer = Buffer.from(zippedResponse.data);
    const zip = new AdmZip(zipBuffer);
    const jsonData = JSON.parse(zip.readAsText(zip.getEntries()[0])) as IAvioWikiAirport[];

    profiler.done({
      level: "debug",
      message: `Done downloading ${jsonData.length} incoming airports`,
      counts: {
        incomingData: jsonData.length,
      },
    });

    logger.debug("Creating airport models");
    profiler = logger.startTimer();

    const models = jsonData
      // There's lots of entries that don't have any airport code, which is the index used in the local
      // database. Skip importing those airports.
      .filter((airport) => airport.icao || airport.iata || airport.localIdentifier)
      // Convert all the incoming data to AirportInfoModels
      .map((airport) => {
        if (!airport.icao && !airport.iata && !airport.localIdentifier) {
          logger.debug(
            `Skipping ${airport.name} because it has no ICAO, IATA, or local identifier`
          );
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
    profiler.done({
      level: "debug",
      message: `Done creating ${models.length} airport models`,
      counts: { models: models.length },
    });

    logger.debug(`Saving ${models.length} airports to database`);
    profiler = logger.startTimer();

    // Save the world. Good god.
    await AirportInfoModel.deleteMany({});
    await Promise.all(
      models.map(async (model) => {
        try {
          await model.save();
        } catch (err) {
          const error = err as Error;
          logger.error(`Unable to save ${model.name} to database: ${error.message}. Skipping.`);
        }
      })
    );
    profiler.done({
      level: "info",
      message: `Done importing ${models.length} airports.`,
      counts: { models: models.length },
    });
    return {
      success: true,
      data: models.length,
    };
  } catch (error) {
    throw new Error(`Error downloading and extracting airport information from AvioWiki: ${error}`);
  }
}
