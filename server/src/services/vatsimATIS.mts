import debug from "debug";
import _ from "lodash";
import { IVatsimATIS, IVatsimData } from "../interfaces/IVatsimData.mjs";
import { VatsimATISDocument, VatsimATISModel } from "../models/VatsimATIS.mjs";
import { copyPropertyValue } from "../utils/properties.mjs";

const logger = debug("plan-verifier:vatsimATIS");
const updateLogger = debug("vatsim:updateATIS");

// List of the properties on a vatsim flight plan that are eligible to
// be updated when new data is received. departure airport is intentionally
// not in this list as it is updated separately as part of the fix for issue 672.
const updateProperties = ["code", "rawText"] as (keyof VatsimATISDocument)[];

// Takes an ATIS object from vatsim and converts it to a vatsim model
function atisToVatsimModel(atis: IVatsimATIS) {
  const result = new VatsimATISModel({
    callsign: atis.callsign,
    frequency: atis.frequency,
    code: atis.atis_code,
    rawText: atis.text_atis,
  });

  return result;
}

export async function processVatsimATISData(vatsimData: IVatsimData) {
  // Process all the incoming data into a known model.
  const incomingData = vatsimData.atis.map(atisToVatsimModel);

  logger(`Processing ${incomingData.length} incoming VATSIM ATISes`);

  // Find all the callsigns for the current data in the database to use when figuring out
  // what updates to apply.
  const currentData = await VatsimATISModel.find({});
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
    await VatsimATISModel.deleteMany({
      callsign: {
        $in: deletedData.map((data) => data.callsign),
      },
    }),
    // Add the new data
    [...newData.map(async (data) => await data.save())],
    // Update the changed data. This has to be done via save() to ensure middleware runs.
    [...updatedData.map(async (data) => await data.save())],
  ]);

  logger(`Done processing ${incomingData.length} incoming VATSIM ATISes`);
}
