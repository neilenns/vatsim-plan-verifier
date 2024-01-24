import axios, { AxiosError, AxiosResponse } from "axios";
import { IVatsimPilotStats } from "../interfaces/IVatsimPilotStats.mjs";
import mainLogger from "../logger.mjs";
import { PilotStatsDocument, PilotStatsModel } from "../models/PilotStats.mjs";
import { VatsimATISDocument, VatsimATISModel } from "../models/VatsimATIS.mjs";
import {
  VatsimFlightPlanDocument,
  VatsimFlightPlanModel,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "vatsim" });

type VatsimFlightPlanResult = Result<
  VatsimFlightPlanDocument,
  "FlightPlanNotFound" | "UnknownError"
>;

type VatsimFlightPlansResult = Result<
  VatsimFlightPlanDocument[],
  "FlightPlansNotFound" | "UnknownError"
>;

type VatsimPilotStatsResult = Result<PilotStatsDocument, "PilotNotFound" | "UnknownError">;

type VatsimATISResult = Result<VatsimATISDocument, "ATISNotFound" | "UnknownError">;

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
    logger.error(`Error fetching pilot stats for ${cid}: ${error}`);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching pilot stats for ${cid}`,
    };
  }
}

async function fetchPilotStatsFromVatsim(cid: number): Promise<IVatsimPilotStats> {
  const endpointUrl = `https://api.vatsim.net/v2/members/${cid}/stats`;
  try {
    const headers = {
      Accept: "application/json",
    };

    logger.debug(`Fetching VATSIM pilot stats for ${cid}`, { url: endpointUrl });
    const response: AxiosResponse<IVatsimPilotStats> = await axios.get(endpointUrl, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      logger.error(`Error fetching VATSIM pilot stats for ${cid}: ${response.status}`, {
        url: endpointUrl,
      });
      throw new Error(`Error fetching pilot stats for ${cid}: ${response.status}`);
    }
  } catch (error) {
    const err = error as AxiosError;
    // A 404 indicates the pilot is so new there is no data for them yet
    if (err.response?.status === 404) {
      logger.debug(`No pilot stats found for ${cid}. Returning 0s for all values.`);
      return {
        id: cid,
      } as IVatsimPilotStats;
    }

    logger.error(`Error fetching VATSIM pilot stats for ${err.message}`, { url: endpointUrl });
    throw new Error(`Error fetching pilot stats for ${cid}: ${err.message}`);
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
    logger.error(`Error fetching flight plans for ${departure}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departure}: ${error}`,
    };
  }
}

export async function getVatsimEDCTFlightPlans(
  departures: string[],
  arrivals: string[]
): Promise<VatsimFlightPlansResult> {
  try {
    const result = await VatsimFlightPlanModel.find({
      departure: { $in: departures },
      arrival: { $in: arrivals },
      status: VatsimFlightStatus.DEPARTING,
    }).sort({ callsign: 1 });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans on the ground at ${departures} and arriving ${arrivals} not found.`,
      };
    }
  } catch (error) {
    logger.error(`Error fetching flight plans for ${departures} ${arrivals}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departures} ${arrivals}: ${error}`,
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
    logger.error(`Error fetching flight plan for ${callsign}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plan for ${callsign}: ${error}`,
    };
  }
}

export async function getVatsimAtis(callsign: string): Promise<VatsimATISResult> {
  try {
    const result = await VatsimATISModel.findOne({ callsign });

    if (result) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "ATISNotFound",
        error: `ATIS for ${callsign} not found.`,
      };
    }
  } catch (error) {
    logger.error(`Error fetching ATIS for ${callsign}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching ATIS for ${callsign}: ${error}`,
    };
  }
}
