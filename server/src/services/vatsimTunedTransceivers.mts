import axios from "axios";
import { getVatsimEndpoints } from "./vatsim.mjs";
import debug from "debug";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import { Transceiver, TunedTransceiversModel } from "../models/VatsimTunedTransceivers.mjs";

const logger = debug("plan-verifier:vatsimTransceivers");

let vatsimEndpoints: IVatsimEndpoints | undefined;

export async function getVatsimTunedTransceivers() {
  logger("Fetching VATSIM transceivers...");

  if (!vatsimEndpoints) {
    const endpointsResult = await getVatsimEndpoints();
    if (!endpointsResult.success) {
      logger("Unable to retrieve VATSIM endpoints");
      return {
        success: false,
        errorType: "VatsimFailure",
        error: "Unable to retrieve VATSIM endpoints",
      };
    } else {
      vatsimEndpoints = endpointsResult.data;
    }
  }

  const dataEndpoint = vatsimEndpoints?.data.transceivers[0];

  if (!dataEndpoint) {
    logger("Unable to retrieve VATSIM data endpoint");
    return {
      success: false,
      errorType: "VatsimFailure",
      error: "Unable to retrieve VATSIM data endpoint",
    };
  }

  try {
    const response = await axios.get(dataEndpoint);

    if (response.status === 200) {
      logger(`Received ${response.data.length} transceivers`);
      await processVatsimTransceivers(response.data as ITunedTransceivers[]);
      return {
        success: true,
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
      error: `Error fetching VATSIM transceivers: ${error}`,
    };
  }
}

async function processVatsimTransceivers(clients: ITunedTransceivers[]) {
  if (!clients || clients.length === 0) {
    logger(`No clients received from VATSIM.`);
    return;
  }

  // Clear all the old transceivers out
  await TunedTransceiversModel.deleteMany({});

  await Promise.all(
    clients.map(async (client) => {
      const dbEntry = new TunedTransceiversModel({
        callsign: client.callsign,
        transceivers: client.transceivers.map((transceiver) => {
          return { ...transceiver, frequency: (transceiver.frequency / 1000000).toFixed(3) };
        }),
      });
      await dbEntry.save();
    })
  );
}
