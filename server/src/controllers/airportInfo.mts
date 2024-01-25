import AdmZip from "adm-zip";
import axios, { AxiosError, AxiosResponse } from "axios";
import winston from "winston";
import { ENV } from "../env.mjs";
import { IAvioWikiAirport } from "../interfaces/IAvioWikiAirport.mjs";
import mainLogger from "../logger.mjs";
import { AirportInfoDocument, AirportInfoModel } from "../models/AirportInfo.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "airportInfo" });

type AirportInfoResult = Result<AirportInfoDocument, "AirportNotFound" | "UnknownError">;
type FetchAvioWikiAirportsResult = Result<number, "UnknownError">;

export async function getAirportInfo(airportCode: string): Promise<AirportInfoResult> {
  try {
    const airport = await AirportInfoModel.findOne({ airportCode });

    if (airport) {
      // Airports with blank names are placeholders indicating it doesn't exist to prevent repeated checks with
      // FlightAware
      if (airport.name) {
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
      logger.error(`No airport found for ${airportCode}`);

      // Store an empty airport in the database so Flight Aware won't keep getting called for
      // airports that don't exist. These will automatically get cleared out of the database every
      // time the job runs that pulls the entire airport database from AvioWiki.
      const failedAirport = new AirportInfoModel({
        airportCode,
      });
      await failedAirport.save();

      return {
        success: false,
        errorType: "AirportNotFound",
        error: `No airport found for ${airportCode}`,
      };
    }

    // Issue 837:
    // This handles the case of someone filing `KL77` when the airport code is actually `L77`.
    // FightAware will happily find that and return the airport data but the reality is the
    // airport code is wrong and it should not be treated as a found airport.
    if (fetchedAirport.airportCode !== airportCode) {
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
    logger.error(error.message);
    return {
      success: false,
      errorType: "UnknownError",
      error: `${error}`,
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
      message: `Done downloading ${jsonData.length} incoming airports`,
      counts: {
        incomingData: jsonData.length,
      },
    });

    logger.info("Creating airport models");
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
      level: "info",
      message: `Done creating ${models.length} airport models`,
      counts: { models: models.length },
    });

    logger.info(`Saving ${models.length} airports to database`);
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
      message: `Done saving ${models.length} airports to the database.`,
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
