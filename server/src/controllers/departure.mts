import DepartureModel, { Departure } from "../models/Departure.mjs";
import Result from "../types/result.mjs";

type DepartureResult = Result<Departure, "DepartureNotFound" | "UnknownError">;

export async function getDeparture(id: string): Promise<DepartureResult> {
  try {
    const fetchedDeparture = await DepartureModel.findById(id);

    if (fetchedDeparture) {
      return { success: true, data: fetchedDeparture };
    } else {
      return {
        success: false,
        errorType: "DepartureNotFound",
        error: `Departure ${id} not found.`,
      };
    }
  } catch (error) {
    console.log(`Error fetching departure ${id}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching departure ${id}: ${error}`,
    };
  }
}
