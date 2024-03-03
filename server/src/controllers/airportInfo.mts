import AdmZip from "adm-zip";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type winston from "winston";
import { ENV } from "../env.mjs";
import { type IAvioWikiAirport } from "../interfaces/IAvioWikiAirport.mjs";
import mainLogger from "../logger.mjs";
import { type AirportInfoDocument, AirportInfoModel } from "../models/AirportInfo.mjs";
import type Result from "../types/result.mjs";
import { logMongoBulkErrors } from "../utils.mjs";

const logger = mainLogger.child({ service: "airportInfo" });

type AirportInfoResult = Result<AirportInfoDocument, "AirportNotFound" | "UnknownError">;
type FetchAvioWikiAirportsResult = Result<number, "UnknownError">;

/**
 * Gets the airport info for the specified airport. If useCache is true
 * then a lightweight cached object without any methods attached may be returned
 * and only real properties can be accessed on the returned object.
 * @param airportCode The airport code for the airport to look up
 * @param useCache True to use cached airport values. Default false.
 * @returns The airport info.
 */
export async function getAirportInfo(airportCode: string): Promise<AirportInfoResult> {
  try {
    const airport = await AirportInfoModel.findOne({ airportCode }).cacheQuery({
      ttl: 60 * 60 * 24 * 30,
    }); // 30 days, this data never changes

    // Airports with blank names are placeholders indicating it doesn't exist to prevent repeated checks with
    // FlightAware
    if (airport?.name != null) {
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
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching cached airport for ${airportCode}: ${error.message}`,
    };
  }
}

/**
 * Fetches airport information from the FlightAware aeroapi.
 * @param airportCode The airport code for the airport to look up
 * @returns The airport information, or undefined if the airport wasn't found
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  } catch (err) {
    // 400 error is thrown if the airport wasn't found, so in that case specifically return undefined
    // instead of throwing another error.
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        return undefined;
      }
    }
    const error = err as Error;
    logger.error(`Error fetching airport information for ${airportCode}: ${error.message}`, {
      url: endpointUrl,
      error,
    });

    throw new Error(`Error fetching airport information for ${airportCode}: ${error.message}`);
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
    const zipBuffer = Buffer.from(zippedResponse.data as ArrayBuffer);
    const zip = new AdmZip(zipBuffer);
    const jsonData = JSON.parse(zip.readAsText(zip.getEntries()[0])) as IAvioWikiAirport[];

    profiler.done({
      level: "debug",
      message: `Done downloading ${jsonData.length} incoming airports`,
      counts: {
        incomingData: jsonData.length,
      },
    });

    profiler = logger.startTimer();

    const models = jsonData
      // There's lots of entries that don't have any airport code, which is the index used in the local
      // database. Skip importing those airports. This is done as a filter so the
      // returned value from the map is always just a list of AirportInfoModel objects.
      .filter((airport) => {
        return airport.icao.length > 0 || airport.iata.length > 0 || airport.localIdentifier;
      })
      // Convert all the incoming data to AirportInfoModels
      .map((airport) => {
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

    profiler = logger.startTimer();

    // Delete everything
    await AirportInfoModel.deleteMany({});

    // Add everything back
    try {
      // { ordered: false } ensures a single save failure doesn't abort the entire save
      await AirportInfoModel.bulkSave(models, { ordered: false });
    } catch (err) {
      logMongoBulkErrors(logger, err);
    }

    profiler.done({
      level: "info",
      message: `Done importing ${models.length} airports.`,
      counts: { models: models.length },
    });
    return {
      success: true,
      data: models.length,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(
      `Error downloading and extracting airport information from AvioWiki: ${error.message}`
    );
  }
}
