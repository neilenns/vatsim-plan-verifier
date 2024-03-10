import axios, { type AxiosError, type AxiosResponse } from "axios";
import { Types } from "mongoose";
import { type IVatsimPilotStats } from "../interfaces/IVatsimPilotStats.mjs";
import mainLogger from "../logger.mjs";
import { PilotStatsModel, type PilotStatsDocument } from "../models/PilotStats.mjs";
import { VatsimATISModel, type VatsimATISDocument } from "../models/VatsimATIS.mjs";
import {
  VatsimFlightPlanModel,
  VatsimFlightStatus,
  type VatsimFlightPlanDocument,
} from "../models/VatsimFlightPlan.mjs";
import type Result from "../types/result.mjs";

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

export async function setVatsimFlightPlanEDCT(
  _id: string,
  callsign: string,
  sentEDCT?: boolean,
  edct?: Date
): Promise<VatsimFlightPlanResult> {
  try {
    let flightPlan;

    // The way to find the flight plan depends on whether an _id or a callsign was provided.
    // _id takes precedence.
    if (_id !== "") {
      flightPlan = await VatsimFlightPlanModel.findById(new Types.ObjectId(_id)).cacheQuery();
    } else {
      flightPlan = await VatsimFlightPlanModel.findOne({ callsign }).cacheQuery();
    }

    if (flightPlan == null) {
      return {
        success: false,
        errorType: "FlightPlanNotFound",
        error: `Unable to find flight plan for ${_id ?? callsign}`,
      };
    }

    // The incoming value for EDCT can either be the date, undefined (indicating don't change),
    // or null (indicating remove any EDCT that might be set).
    // Test for the do nothing case (undefined). If that's not true then either set the value
    // or clear it.
    if (edct !== undefined) {
      flightPlan.EDCT = edct ?? undefined;
    }

    // sentEDCT property only gets updated if it was provided
    flightPlan.sentEDCT = sentEDCT ?? flightPlan.sentEDCT;

    const savedPlan = await flightPlan.save();

    return {
      success: true,
      data: savedPlan,
    };
  } catch (err) {
    const error = err as Error;

    const message = `Error setting EDCT info for ${_id ?? callsign}: ${error.message}`;
    logger.error(message, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: message,
    };
  }
}

export async function getVatsimPilotStats(cid: number): Promise<VatsimPilotStatsResult> {
  try {
    const cachedData = await PilotStatsModel.findOne({ cid }).cacheQuery();

    if (cachedData != null) {
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
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching pilot stats for ${cid}: ${error.message}`, error);
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching pilot stats for ${cid}: ${error.message}`,
    };
  }
}

async function fetchPilotStatsFromVatsim(cid: number): Promise<Partial<IVatsimPilotStats>> {
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
  } catch (err) {
    const error = err as AxiosError;

    // A 404 indicates the pilot is so new there is no data for them yet
    if (error.response?.status === 404) {
      logger.debug(`No pilot stats found for ${cid}. Returning 0s for all values.`);
      return {
        id: cid,
      } satisfies Partial<IVatsimPilotStats>;
    }

    logger.error(`Error fetching VATSIM pilot stats for ${error.message}`, {
      url: endpointUrl,
      error,
    });
    throw new Error(`Error fetching pilot stats for ${cid}: ${error.message}`);
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

    if (result.length > 0) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans for ${departure} matching ${flightRules} flight rules and status ${status} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching flight plans for ${departure}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departure}: ${error.message}`,
    };
  }
}

export async function getVatsimEDCTViewOnly(
  departures: string[]
): Promise<VatsimFlightPlansResult> {
  try {
    const result = await VatsimFlightPlanModel.find({
      departure: { $in: departures },
      EDCT: { $ne: undefined },
      status: VatsimFlightStatus.DEPARTING,
    }).sort({ callsign: 1 });

    if (result.length > 0) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans on the ground at ${departures.join(
          ", "
        )} with an EDCT time not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(
      `Error fetching flight plans for ${departures.join(", ")}: ${error.message}`,
      error
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departures.join(", ")}: ${error.message}`,
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

    if (result.length > 0) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlansNotFound",
        error: `Flight plans on the ground at ${departures.join(", ")} and arriving ${arrivals.join(
          ", "
        )} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(
      `Error fetching flight plans for ${departures.join(", ")} ${arrivals.join(", ")}: ${
        error.message
      }`,
      error
    );

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plans for ${departures.join(", ")} ${arrivals.join(", ")}: ${
        error.message
      }`,
    };
  }
}

export async function getVatsimFlightPlan(callsign: string): Promise<VatsimFlightPlanResult> {
  try {
    const result = await VatsimFlightPlanModel.findOne({
      callsign,
    });

    if (result != null) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "FlightPlanNotFound",
        error: `Flight plans for ${callsign} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching flight plan for ${callsign}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching flight plan for ${callsign}: ${error.message}`,
    };
  }
}

export async function getVatsimAtis(callsign: string): Promise<VatsimATISResult> {
  try {
    const result = await VatsimATISModel.findOne({ callsign }).cacheQuery({ ttl: 60 }); // One minute

    if (result != null) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        errorType: "ATISNotFound",
        error: `ATIS for ${callsign} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching ATIS for ${callsign}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching ATIS for ${callsign}: ${error.message}`,
    };
  }
}
