import { PilotStatsDocument, PilotStatsModel } from "../models/PilotStats.mjs";
import {
  VatsimFlightPlanModel,
  VatsimFlightPlanDocument,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";
import Result from "../types/result.mjs";
import debug from "debug";
import axios, { AxiosResponse } from "axios";
import { IVatsimPilotStats } from "../interfaces/IVatsimPilotStats.mjs";

const logger = debug("plan-verifier:vatsimController");

type VatsimFlightPlanResult = Result<
  VatsimFlightPlanDocument,
  "FlightPlanNotFound" | "UnknownError"
>;

type VatsimFlightPlansResult = Result<
  VatsimFlightPlanDocument[],
  "FlightPlansNotFound" | "UnknownError"
>;

type VatsimPilotStatsResult = Result<PilotStatsDocument, "PilotNotFound" | "UnknownError">;

export async function getVatsimPilotStats(cid: number): Promise<VatsimPilotStatsResult> {
  try {
    const cachedData = await PilotStatsModel.findOne({ cid });

    if (cachedData) {
      return { success: true, data: cachedData };
    }

    // Data isn't cached so pull it from vatsim
    const pilotData = await fetchPilotStatsFromVatsim(cid);
    // The id field needs to be split out from the rest of the data so when
    // the spread operator is used to create the PilotStatsModel it doesn't try
    // writing a number to the _id/id field that Mongoose wants as a Types.ObjectId.
    const { id, ...data } = pilotData;
    const pilotStats = new PilotStatsModel({
      ...data,
      cid: id,
    });
    const doc = await pilotStats.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error fetching pilot stats for ${cid}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching pilot stats for ${cid}`,
    };
  }
}

async function fetchPilotStatsFromVatsim(cid: number): Promise<IVatsimPilotStats> {
  try {
    const headers = {
      Accept: "application/json",
    };
    const endpointUrl = `https://api.vatsim.net/v2/members/${cid}/stats`;
    const response: AxiosResponse<IVatsimPilotStats> = await axios.get(endpointUrl, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching pilot stats for ${cid}: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching pilot stats for ${cid}: ${error}`);
  }
}

export async function getVatsimFlightPlans(
  departure: string,
  flightRules: string,
  status: VatsimFlightStatus
): Promise<VatsimFlightPlansResult> {
  try {
    const result = await VatsimFlightPlanModel.find({
      departure,
      flightRules,
      status,
    });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans for ${departure} matching ${flightRules} flight rules and status ${status} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching flight plans for ${departure}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departure}: ${error}`,
    };
  }
}

export async function getVatsimFlightPlan(callsign: string): Promise<VatsimFlightPlanResult> {
  try {
    const result = await VatsimFlightPlanModel.findOne({
      callsign,
    });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlanNotFound",
        error: `Flight plans for ${callsign} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching flight plan for ${callsign}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plan for ${callsign}: ${error}`,
    };
  }
}
