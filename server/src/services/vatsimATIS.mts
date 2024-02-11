import _ from "lodash";
import { IVatsimATIS, IVatsimData } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { VatsimATISDocument, VatsimATISModel } from "../models/VatsimATIS.mjs";
import { copyPropertyValue } from "../utils/properties.mjs";

const logger = mainLogger.child({ service: "vatsimATIS" });

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

  logger.info(`Processing ${incomingData.length} incoming VATSIM ATISes`);
  const profiler = logger.startTimer();

  // Find all the callsigns for the current data in the database to use when figuring out
  // what updates to apply.
  const currentData = await VatsimATISModel.find({});

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

    updateProperties.forEach((property) =>
      copyPropertyValue(incomingData, currentData, property, logger)
    );

    return currentData;
  });

  let savedDataCount = 0;

  try {
    // Save all the changes to the database
    await Promise.all([
      // Delete the data that no longer exists
      await VatsimATISModel.deleteMany({
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
  } catch (error) {
    const err = error as Error;
    logger.error(`Error updating ATISes: ${err.message}`);
  }

  profiler.done({
    message: `Done processing ${incomingData.length} incoming VATSIM ATISes`,
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
