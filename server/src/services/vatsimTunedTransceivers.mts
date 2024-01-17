import axios from "axios";
import { getVatsimEndpoints } from "./vatsim.mjs";
import debug from "debug";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import { Transceiver, TunedTransceiversModel } from "../models/VatsimTunedTransceivers.mjs";

const logger = debug("plan-verifier:vatsimTransceivers");

export async function getVatsimTunedTransceivers(endpoints: IVatsimEndpoints | null) {
  logger("Fetching VATSIM transceivers...");

  const dataEndpoint = endpoints?.data.transceivers[0];

  if (!dataEndpoint) {
    return {
      success: false,
      errorType: "VatsimFailure",
      error: `Unable to retrieve VATSIM data, no endpoints available.`,
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
          return { ...transceiver, frequency: transceiver.frequency / 1000000 };
        }),
      });
      await dbEntry.save();
    })
  );
}
