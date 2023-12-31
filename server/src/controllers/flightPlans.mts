import { FlightPlanModel, FlightPlanDocument, FlightPlan } from "../models/FlightPlan.mjs";
import { VatsimFlightPlanModel } from "../models/VatsimFlightPlan.mjs";
import Result from "../types/result.mjs";
import debug from "debug";
import { uppercaseStringProperties } from "../utils/formatting.mjs";

const logger = debug("plan-verifier:flightPlansController");

export type FlightPlanFailureErrorTypes =
  | "VatsimFlightPlanNotFound"
  | "FlightPlanNotFound"
  | "UnknownError";
export type FlightPlanResult = Result<FlightPlanDocument, FlightPlanFailureErrorTypes>;

export async function putFlightPlan(flightPlanData: FlightPlan): Promise<FlightPlanResult> {
  try {
    // Create a new instance of the FlightPlan model
    const newFlightPlan = new FlightPlanModel(uppercaseStringProperties(flightPlanData));

    // Save the flight plan to the database
    const savedFlightPlan = await newFlightPlan.save();

    return {
      success: true,
      data: savedFlightPlan,
    };
  } catch (error) {
    logger(`Unable to save flight plan: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to save the flight plan: ${error}.`,
    };
  }
}

export async function getFlightPlan(id: string): Promise<FlightPlanResult> {
  try {
    const flightPlan = await FlightPlanModel.findById(id);

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
    logger(`Unable to retrieve flight plan ${id}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to get the flight plan: ${error}.`,
    };
  }
}

export async function importFlightPlan(callsign: string): Promise<FlightPlanResult> {
  try {
    const vatsimPlan = await VatsimFlightPlanModel.findOne({ callsign });

    if (!vatsimPlan) {
      return {
        success: false,
        errorType: "VatsimFlightPlanNotFound",
        error: `Vatsim plan for ${callsign} not found.`,
      };
    }

    const flightPlan = {
      cid: vatsimPlan.cid,
      pilotName: vatsimPlan.name,
      callsign: vatsimPlan.callsign!,
      departure: vatsimPlan.departure!,
      arrival: vatsimPlan.arrival!,
      route: vatsimPlan.route!,
      rawAircraftType: vatsimPlan.rawAircraftType ?? "", // Issue #369, sometimes plans from vatsim don't have the aircraft type specified.
      cruiseAltitude: vatsimPlan.cruiseAltitude!,
      squawk: vatsimPlan.squawk!,
      remarks: vatsimPlan.remarks!,
      communicationMethod: vatsimPlan.communicationMethod!,
    } as FlightPlan;

    return putFlightPlan(flightPlan);
  } catch (error) {
    logger(`Unable to retrieve flight plan for ${callsign}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Failed to get the flight plan: ${error}.`,
    };
  }
}
