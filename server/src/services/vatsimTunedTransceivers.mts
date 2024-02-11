import axios from "axios";
import _ from "lodash";
import { ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import mainLogger from "../logger.mjs";
import { TunedTransceivers, TunedTransceiversModel } from "../models/VatsimTunedTransceivers.mjs";

const logger = mainLogger.child({ service: "vatsimTunedTransceivers" });

const updateProperties = ["com1", "com2"] as (keyof TunedTransceivers)[];

export async function getVatsimTunedTransceivers(endpoint: string) {
  logger.info("Downloading latest VATSIM transceivers");

  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
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

function transceiverToVatsimModel(transceiver: ITunedTransceivers) {
  const result = new TunedTransceiversModel({
    callsign: transceiver.callsign,
    com1: transceiver.transceivers[0]?.frequency ?? undefined,
    com2: transceiver.transceivers[1]?.frequency ?? undefined,
  });

  return result;
}

async function processVatsimTransceivers(clients: ITunedTransceivers[]) {
  if (!clients || clients.length === 0) {
    logger.info(`No clients received from VATSIM.`);
    return;
  }

  const incomingData = clients.map(transceiverToVatsimModel);

  logger.info(`Processing ${incomingData.length} incoming VATSIM transceivers`);
  const profiler = logger.startTimer();

  // Find all the transceivers for the current data in the database to use when figuring out
  // what updates to apply.
  const currentData = await TunedTransceiversModel.find({});

  // Find all the new data that doesn't exist in the database.
  const newData = _.differenceBy(incomingData, currentData, "callsign");

  // Find the data in the database that no longer exists on vatsim.
  const deletedData = _.differenceBy(currentData, incomingData, "callsign");

  // Find the overlapping data that need to have updates applied
  const overlappingData = _.intersectionBy(incomingData, currentData, "callsign");

  // Build out a dictionary of the current data to improve performance of the update
  const currentDataDictionary = _.keyBy(currentData, "callsign");

  // Udpate with new data
  const updatedData = overlappingData.map((incomingData) => {
    const currentData = currentDataDictionary[incomingData.callsign];
    currentData.com1 = incomingData.com1;
    currentData.com2 = incomingData.com2;

    return currentData;
  });

  let savedDataCount = 0;
  await Promise.all([
    // Delete the data that no longer exists
    await TunedTransceiversModel.deleteMany({
      callsign: {
        $in: deletedData.map((data) => data.callsign),
      },
    }),

    // Add the new data
    await Promise.all([...newData.map(async (data) => await data.save())]),

    // Update the changed data. This has to be done via save() to ensure middleware runs.
    await Promise.all([
      ...updatedData.map(async (data) => {
        // Issue 982: Turns out the save() method isn't smart and still does something even if there are
        // no modifications, which slows things down a TON. Check for modifications before calling save.
        const wasUpdated = await data.saveIfModified();
        if (wasUpdated) savedDataCount++;
      }),
    ]),
  ]);
  logger.debug(`Saved ${savedDataCount} updated transceivers`, { savedDataCount });

  profiler.done({
    message: `Done processing ${incomingData.length} incoming VATSIM transceivers`,
    counts: {
      current: currentData.length,
      incoming: incomingData.length,
      new: newData.length,
      deleted: deletedData.length,
      overlapping: overlappingData.length,
      saved: savedDataCount,
    },
  });
}
