import Aircraft, { IAircraft } from "../models/Aircraft.mjs";

type AircraftSuccessResult = {
  success: true;
  data: IAircraft;
};

type AircraftFailureResult = {
  success: false;
  errorType: "AircraftNotFound" | "UnknownError";
  error: string;
};

type GetAircraftResult = AircraftSuccessResult | AircraftFailureResult;

export async function getAircraft(id: string): Promise<GetAircraftResult> {
  try {
    const fetchedAircraft = await Aircraft.findById(id);

    if (fetchedAircraft) {
      return { success: true, data: fetchedAircraft };
    } else {
      return {
        success: false,
        errorType: "AircraftNotFound",
        error: `Aircraft ${id} not found.`,
      };
    }
  } catch (error) {
    console.log(`Error fetching aircraft ${id}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching aircraft ${id}: ${error}`,
    };
  }
}
