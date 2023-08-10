import axios, { AxiosResponse } from "axios";
import MagneticVariationResponse from "../interfaces/IMagneticDeclinationResponse.mjs";
import Result from "../types/result.mjs";
import { ENV } from "../env.mjs";

type MagneticDeclinationResult = Result<number, "UnknownError">;

export async function getMagneticDeclination(
  latitude: number,
  longitude: number
): Promise<MagneticDeclinationResult> {
  try {
    throw Error("This should not be getting called!");
    const endpointUrl = `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latitude}&lon1=${longitude}&key=${ENV.GEOMAG_API_KEY}&resultFormat=json`;
    let response: AxiosResponse<MagneticVariationResponse> = await axios.get(endpointUrl);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.result[0]?.declination ?? 0,
      };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unknown error: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching magnetic declination: ${error}`,
    };
  }
}
