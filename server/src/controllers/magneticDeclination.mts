import axios, { type AxiosResponse } from "axios";
import { ENV } from "../env.mjs";
import type MagneticVariationResponse from "../interfaces/IMagneticDeclinationResponse.mjs";
import mainLogger from "../logger.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "magneticDeclination" });

type MagneticDeclinationResult = Result<number, "UnknownError">;

export async function getMagneticDeclination(
  latitude: number,
  longitude: number
): Promise<MagneticDeclinationResult> {
  // The key is not included in the endpointUrl since it is logged. The key gets added in axios.get() call.
  const endpointUrl = `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latitude}&lon1=${longitude}&resultFormat=json`;

  try {
    logger.debug(`Fetching magnetic declination for ${latitude} ${longitude}`, {
      url: endpointUrl,
    });

    const response: AxiosResponse<MagneticVariationResponse> = await axios.get(
      `${endpointUrl}&key=${ENV.GEOMAG_API_KEY}`
    );

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.result[0]?.declination ?? 0,
      };
    } else {
      logger.error(
        `Error fetching magnetic declination for ${latitude} ${longitude}: ${response.status} ${response.statusText}`,
        { url: endpointUrl }
      );
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unknown error: ${response.status} ${response.statusText}`,
      };
    }
  } catch (err) {
    const error = err as Error;
    logger.error(
      `Error fetching magnetic declination for ${latitude} ${longitude}: ${error.message}`,
      {
        url: endpointUrl,
        error,
      }
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching magnetic declination: ${error}`,
    };
  }
}
