import axios from "axios";
import _ from "lodash";
import { ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import mainLogger from "../logger.mjs";
import {
  Transceiver,
  TunedTransceivers,
  TunedTransceiversModel,
} from "../models/VatsimTunedTransceivers.mjs";
import { copyPropertyValue } from "../utils/properties.mjs";

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
    com1: transceiver.transceivers[0] ?? undefined,
    com2: transceiver.transceivers[1] ?? undefined,
  });

  return result;
}

let count = 0;
let sumOfDelta = 0;
function updateTransceiver(currentData?: Transceiver, incomingData?: Transceiver) {
  if (incomingData === undefined || currentData === undefined) {
    currentData = incomingData;
  } else {
    const delta = Math.abs(currentData.latDeg - incomingData.latDeg);
    count++;
    sumOfDelta += delta;
    currentData.frequency = incomingData.frequency;
    currentData.heightAglM = incomingData.heightAglM;
    currentData.heightMslM = incomingData.heightMslM;
    currentData.latDeg = incomingData.latDeg;
    currentData.lonDeg = incomingData.lonDeg;
  }
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

  // Save the new data
  const updatedData = overlappingData.map((incomingData) => {
    const currentData = currentDataDictionary[incomingData.callsign];

    updateTransceiver(currentData.com1, incomingData.com1);
    updateTransceiver(currentData.com2, incomingData.com2);

    return currentData;
  });

  let savedDataCount = 0;
  // Save all the changes to the database
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
        if (data.isModified()) {
          savedDataCount++;
          await data.save();
        }
      }),
    ]),
  ]);
  logger.debug(`Saved ${savedDataCount} updated transceivers`);

  profiler.done({
    message: `Done processing ${incomingData.length} incoming VATSIM transceivers`,
    counts: {
      currentData: currentData.length,
      incomingData: incomingData.length,
      newData: newData.length,
      deletedData: deletedData.length,
      overlappingData: overlappingData.length,
    },
  });
}
