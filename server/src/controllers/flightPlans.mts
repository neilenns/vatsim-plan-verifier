import IFlightPlan from "../interfaces/flightPlan.mjs";
import FlightPlan from "../models/flightPlan.mjs";

type FlightPlanSuccessResult = {
  success: true;
  data: IFlightPlan;
};

type FlightPlanFailureResult = {
  success: false;
  errorType: "FlightPlanNotFound" | "UnknownError";
  error: string;
};

type FlightPlanResult = FlightPlanSuccessResult | FlightPlanFailureResult;

type ParsedRawAircraftInfo = {
  equipmentCode?: string;
  equipmentSuffix?: string;
  isHeavy?: boolean;
};

function parseRawAircraftType({
  rawAircraftType,
}: IFlightPlan): ParsedRawAircraftInfo {
  const returnValue: ParsedRawAircraftInfo = {};

  if (rawAircraftType.startsWith("/H")) {
    returnValue.isHeavy = true;
    rawAircraftType = rawAircraftType.substring(2); // Strip off the leading "H/"
  }

  const codeMatch = rawAircraftType.match(/^([A-Z0-9]+)(\/([A-Z]))?$/);
  if (codeMatch && codeMatch.length > 0) {
    returnValue.equipmentCode = codeMatch[1];
    if (codeMatch.length > 2 && codeMatch[3]) {
      returnValue.equipmentSuffix = codeMatch[3];
    }
  }

  return returnValue;
}

export async function putFlightPlan(
  flightPlanData: IFlightPlan
): Promise<FlightPlanResult> {
  try {
    const parsedData = parseRawAircraftType(flightPlanData);

    // Create a new instance of the FlightPlan model
    const newFlightPlan = new FlightPlan({
      ...flightPlanData,
      ...parsedData,
    });

    // Save the flight plan to the database
    const savedFlightPlan = await newFlightPlan.save();

    return {
      success: true,
      data: savedFlightPlan,
    };
  } catch (error) {
    console.error(`Unable to save flight plan: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to save the flight plan: ${error}.`,
    };
  }
}

export async function getFlightPlan(id: string): Promise<FlightPlanResult> {
  try {
    const flightPlan = await FlightPlan.findById(id);

    if (!flightPlan) {
      return {
        success: false,
        errorType: "FlightPlanNotFound",
        error: `Flight plan ${id} not found.`,
      };
    }

    return {
      success: true,
      data: flightPlan,
    };
  } catch (error) {
    console.error(`Unable to retrieve flight plan ${id}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to get the flight plan: ${error}.`,
    };
  }
}
