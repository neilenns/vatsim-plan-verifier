import axios from "axios";
import _ from "lodash";
import { type ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import mainLogger from "../logger.mjs";
import {
  type TunedTransceiversDocument,
  TunedTransceiversModel,
} from "../models/VatsimTunedTransceivers.mjs";

const logger = mainLogger.child({ service: "vatsimTunedTransceivers" });

// Counts how many incoming transceivers wind up not being modified because their
// data didn't change from what was already in the database.
let unchangedCount = 0;

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

function calculateNewAndUpdated(
  currentTransceivers: _.Dictionary<TunedTransceiversDocument>,
  incomingTransceivers: _.Dictionary<ITunedTransceivers>
) {
  let profiler = logger.startTimer();

  const dataToAdd: TunedTransceiversDocument[] = [];
  const dataToUpdate: TunedTransceiversDocument[] = [];

  profiler = logger.startTimer();

  _.map(incomingTransceivers, (incomingTransceiver, key) => {
    const currentTransceiver = currentTransceivers[incomingTransceiver.callsign];

    // If it's not found it's new
    if (!currentTransceiver) {
      dataToAdd.push(transceiverToVatsimModel(incomingTransceiver));
      return;
    }

    // It's an existing transceiver so update it
    currentTransceiver.com1 = incomingTransceiver.transceivers[0]?.frequency ?? undefined;
    currentTransceiver.com2 = incomingTransceiver.transceivers[1]?.frequency ?? undefined;

    // Only add to update list if something changed. This saves a huge amount of
    // execution time by avoiding unnecessary saves back to the database.
    if (currentTransceiver.isModified()) {
      dataToUpdate.push(currentTransceiver);
    } else {
      unchangedCount++;
    }
  });

  profiler.done({
    level: "debug",
    message: `Done calculating new and updated transceivers: ${dataToAdd.length} new, ${dataToUpdate.length} to update, ${unchangedCount} unchanged`,
  });

  return [dataToAdd, dataToUpdate];
}

async function processVatsimTransceivers(clients: ITunedTransceivers[]) {
  const profiler = logger.startTimer();

  if (!clients || clients.length === 0) {
    logger.info(`No clients received from VATSIM.`);
    return;
  }
  logger.info(`Processing ${clients.length} incoming VATSIM transceivers`, {
    transceivers: clients.length,
  });

  // Build dictionaries of the current and incoming data to speed up
  // looking for items.
  const incomingData = _.keyBy(clients, "callsign");
  const currentData = _.keyBy(await TunedTransceiversModel.find({}), "callsign");

  // Build the lists of data to add, update, and delete.
  const [dataToAdd, dataToUpdate] = calculateNewAndUpdated(currentData, incomingData);
  const dataToDelete = _.differenceBy(_.keys(currentData), _.keys(incomingData));

  // Apply all the changes to the database.
  try {
    await Promise.all([
      TunedTransceiversModel.bulkSave([...dataToAdd, ...dataToUpdate]),
      TunedTransceiversModel.deleteMany({
        callsign: {
          $in: dataToDelete,
        },
      }),
    ]);
  } catch (err) {
    const error = err as Error;

    logger.error(`Error updating transceivers: ${error.message}`, error);
  }

  profiler.done({
    message: `Done processing ${_.size(incomingData)} incoming VATSIM transceivers`,
    counts: {
      current: _.size(currentData),
      deleted: dataToDelete.length,
      incoming: _.size(incomingData),
      new: dataToAdd.length,
      unchanged: unchangedCount,
      updated: dataToUpdate.length,
    },
  });
}
