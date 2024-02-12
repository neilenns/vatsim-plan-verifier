import axios from "axios";
import _ from "lodash";
import { ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import mainLogger from "../logger.mjs";
import {
  TunedTransceivers,
  TunedTransceiversModel,
  TunedTransceiversDocument,
} from "../models/VatsimTunedTransceivers.mjs";

const logger = mainLogger.child({ service: "vatsimTunedTransceivers" });

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

let unmodifiedCount = 0;

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

    // It's an existing plan, update it
    currentTransceiver.com1 = incomingTransceiver.transceivers[0]?.frequency ?? undefined;
    currentTransceiver.com2 = incomingTransceiver.transceivers[1]?.frequency ?? undefined;

    if (currentTransceiver.isModified()) {
      dataToUpdate.push(currentTransceiver);
    } else {
      unmodifiedCount++;
    }
  });

  profiler.done({
    message: `Done calculating new and updated transceivers: ${dataToAdd.length} new, ${dataToUpdate.length} to update, ${unmodifiedCount} unchanged`,
  });

  return [dataToAdd, dataToUpdate];
}

async function processVatsimTransceivers(clients: ITunedTransceivers[]) {
  const profiler = logger.startTimer();

  if (!clients || clients.length === 0) {
    logger.info(`No clients received from VATSIM.`);
    return;
  }

  const incomingData = _.keyBy(clients, "callsign");
  logger.info(`Processing ${_.size(incomingData)} incoming VATSIM transceivers`);
  profiler.done({ message: "Done creating the list of incoming transceivers" });

  // Find all the transceivers for the current data in the database to use when figuring out
  // what updates to apply.
  const currentData = _.keyBy(await TunedTransceiversModel.find({}), "callsign");
  profiler.done({ message: "Done loading current transceivers from the database" });

  const [dataToAdd, dataToUpdate] = calculateNewAndUpdated(currentData, incomingData);
  const dataToDelete = _.differenceBy(_.keys(currentData), _.keys(incomingData));

  try {
    await Promise.all([
      // Delete the data that no longer exists
      await TunedTransceiversModel.deleteMany({
        callsign: {
          $in: dataToDelete,
        },
      }),

      // Save the new and udpated data
      await Promise.all([...dataToAdd, ...dataToUpdate]),
    ]);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error updating transceivers: ${err.message}`);
  }

  profiler.done({
    message: `Done processing ${_.size(incomingData)} incoming VATSIM transceivers`,
    counts: {
      current: currentData.length,
      incoming: incomingData.length,
      new: dataToAdd.length,
      deleted: dataToDelete.length,
      updated: dataToUpdate.length,
      unchanged: unmodifiedCount,
    },
  });
}
