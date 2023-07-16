import Airline, { IAirline } from "../models/Airline.mjs";

type AirlineSuccessResult = {
  success: true;
  data: IAirline[];
};

type AirlineFailureResult = {
  success: false;
  errorType: "AirlineNotFound" | "UnknownError";
  error: string;
};

type GetAircraftResult = AirlineSuccessResult | AirlineFailureResult;

export async function getAirline(
  airlineCode: string
): Promise<GetAircraftResult> {
  try {
    const fetchedAirlines = await Airline.findByAirlineCode(airlineCode);

    if (fetchedAirlines) {
      return { success: true, data: fetchedAirlines };
    } else {
      return {
        success: false,
        errorType: "AirlineNotFound",
        error: `Airline ${airlineCode} not found.`,
      };
    }
  } catch (error) {
    console.log(`Error fetching airlines ${airlineCode}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching airlines ${airlineCode}: ${error}`,
    };
  }
}
