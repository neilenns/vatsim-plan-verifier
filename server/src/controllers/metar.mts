import axios, { AxiosResponse } from "axios";
import Result from "../types/result.mjs";
import { MetarDocument, MetarModel } from "../models/Metar.mjs";
import debug from "debug";
import IAviationWeatherMetar from "../interfaces/IAviationWeather.mjs";

const logger = debug("plan-verifier:getMetarController");
type MetarResult = Result<MetarDocument, "NoMetarFound" | "UnknownError">;

export async function getMetar(airportCode: string): Promise<MetarResult> {
  try {
    // Look for unexpired cached data first
    const cachedMetar = await MetarModel.findOne({ icao: airportCode });

    if (cachedMetar && !(await cachedMetar?.isExpired())) {
      return {
        success: true,
        data: cachedMetar,
      };
    }

    // If there's no cached data or the cache is stale then try and get new metar
    // from aviationweather.gov.
    const fetchedMetar = await fetchMetarFromAviationWeather(airportCode);

    if (!fetchedMetar) {
      logger(`No metar found for ${airportCode}`);
      return {
        success: false,
        errorType: "NoMetarFound",
        error: `No metar found for ${airportCode}`,
      };
    }

    // Save the fetched metar and return it. This code strikes me as total nonsense,
    // why is it so hard to either update or create a new document with mongoose
    // and have it run pre-save middleware? (No, you can't use findOneOrUpdate for this)
    let savedMetar: MetarDocument;
    if (cachedMetar) {
      cachedMetar.metar = fetchedMetar.metar;
      cachedMetar.updatedAt = new Date(); // Force the updatedAt date to update even if the metar didn't change
      savedMetar = await cachedMetar.save();
    } else {
      savedMetar = await new MetarModel({ ...fetchedMetar }).save();
    }
    return {
      success: true,
      data: savedMetar,
    };
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching METAR for ${airportCode}: ${error}`,
    };
  }
}

// Looks up METAR from the flybywireapi. This used to be used to get metar but their
// API went down for a full day. Now aviationweather.gov is used, but this code is
// still here for future use if necessary.
async function fetchMetarFromFlyByWire(airportCode: string): Promise<MetarDocument> {
  const endpointUrl = `https://api.flybywiresim.com/metar/${airportCode}?source=vatsim`;
  const response: AxiosResponse<MetarDocument> = await axios.get(endpointUrl);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Error fetching metar for ${airportCode}: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(`Error fetching metar for ${airportCode}: ${error}`);
  }
}

// Looks up metar from aviationweather.gov.
async function fetchMetarFromAviationWeather(airportCode: string): Promise<MetarDocument> {
  const endpointUrl = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${airportCode}&hours=0&order=id%2C-obs&sep=true&format=json`;

  const response: AxiosResponse<IAviationWeatherMetar[]> = await axios.get(endpointUrl);

  try {
    if (response.status === 200 && response.data.length > 0) {
      return {
        icao: response.data[0].icaoId,
        metar: response.data[0].rawOb,
        source: "AviationWeather",
      } as MetarDocument;
    } else {
      throw new Error(
        `Error fetching metar for ${airportCode}: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(`Error fetching metar for ${airportCode}: ${error}`);
  }
}
