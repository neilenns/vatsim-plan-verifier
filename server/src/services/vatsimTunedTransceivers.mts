import axios from "axios";
import debug from "debug";
import _ from "lodash";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { ITunedTransceivers } from "../interfaces/IVatsimTransceiver.mjs";
import { TunedTransceiversModel } from "../models/VatsimTunedTransceivers.mjs";
import { copyPropertyValue } from "../utils/properties.mjs";

const logger = debug("plan-verifier:vatsimTransceivers");
const updateLogger = debug("vatsim:updateTransceivers");

const updateProperties = ["transceivers"] as (keyof ITunedTransceivers)[];

export async function getVatsimTunedTransceivers(endpoints: IVatsimEndpoints | null) {
  logger("Downloading latest VATSIM transceivers");

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
    transceivers: transceiver.transceivers,
  });

  return result;
}

async function processVatsimTransceivers(clients: ITunedTransceivers[]) {
  if (!clients || clients.length === 0) {
    logger(`No clients received from VATSIM.`);
    return;
  }

  const incomingData = clients.map(transceiverToVatsimModel);

  logger(`Processing ${incomingData.length} incoming VATSIM transceivers`);

  // Find all the transceivers for the current data in the database to use when figuring out
  // what updates to apply.
  const currentData = await TunedTransceiversModel.find({});
  updateLogger(`Current data count: ${currentData.length}`);

  // Find all the new data that doesn't exist in the database.
  const newData = _.differenceBy(incomingData, currentData, "callsign");
  updateLogger(`New data count: ${newData.length}`);

  // Find the data in the database that no longer exists on vatsim.
  const deletedData = _.differenceBy(currentData, incomingData, "callsign");
  updateLogger(`Deleted data count: ${deletedData.length}`);

  // Find the overlapping data that need to have updates applied
  const overlappingData = _.intersectionBy(incomingData, currentData, "callsign");
  updateLogger(`Overlapping data count: ${overlappingData.length}`);

  // Build out a dictionary of the current data to improve performance of the update
  const currentDataDictionary = _.keyBy(currentData, "callsign");

  // Save the new data
  const updatedData = overlappingData.map((incomingData) => {
    const currentData = currentDataDictionary[incomingData.callsign];

    updateProperties.forEach((property) =>
      copyPropertyValue(incomingData, currentData, property, updateLogger)
    );

    return currentData;
  });

  // Save all the changes to the database
  await Promise.all([
    // Delete the data that no longer exists
    await TunedTransceiversModel.deleteMany({
      callsign: {
        $in: deletedData.map((data) => data.callsign),
      },
    }),
    // Add the new data
    [...newData.map(async (data) => await data.save())],
    // Update the changed data. This has to be done via save() to ensure middleware runs.
    [...updatedData.map(async (data) => await data.save())],
  ]);

  logger(`Done processing ${incomingData.length} incoming VATSIM transceivers`);
}
