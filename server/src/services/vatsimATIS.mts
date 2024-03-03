import _ from "lodash";
import { type IVatsimATIS, type IVatsimData } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { type VatsimATISDocument, VatsimATISModel } from "../models/VatsimATIS.mjs";
import { logMongoBulkErrors } from "../utils.mjs";

const logger = mainLogger.child({ service: "vatsimATIS" });

// Counts how many incoming ATISes wind up not being modified because their
// data didn't change from what was already in the database.
let unchangedCount = 0;

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

function calculateNewAndChanged(
  currentATISes: _.Dictionary<VatsimATISDocument>,
  incomingATISes: _.Dictionary<IVatsimATIS>
) {
  let profiler = logger.startTimer();

  const dataToAdd: VatsimATISDocument[] = [];
  const dataToUpdate: VatsimATISDocument[] = [];

  profiler = logger.startTimer();
  _.map(incomingATISes, (incomingATIS, key) => {
    const currentATIS = currentATISes[incomingATIS.callsign];

    // If it's not found it's new
    if (!currentATIS) {
      dataToAdd.push(atisToVatsimModel(incomingATIS));
      return;
    }

    // It's an existing ATIS so update it
    currentATIS.code = incomingATIS.atis_code;
    currentATIS.rawText = incomingATIS.text_atis;

    // Only push updates if something changed. This saves a huge amount of
    // execution time by avoiding unnecessary saves back to the database.
    if (currentATIS.isModified()) {
      dataToUpdate.push(currentATIS);
    } else {
      unchangedCount++;
    }
  });

  return [dataToAdd, dataToUpdate];
}

export async function processVatsimATISData(vatsimData: IVatsimData) {
  const profiler = logger.startTimer();

  logger.info(`Processing ${vatsimData.atis.length} incoming VATSIM ATISes`, {
    ATISes: vatsimData.atis.length,
  });

  // Build dictionaries of the current and incoming data to speed up
  // looking for items.
  const incomingData = _.keyBy(vatsimData.atis, "callsign");
  const currentData = _.keyBy(await VatsimATISModel.find({}), "callsign");

  // Build the lists of data to add, update, and delete.
  const [dataToAdd, dataToUpdate] = calculateNewAndChanged(currentData, incomingData);
  const dataToDelete = _.differenceBy(_.keys(currentData), _.keys(incomingData));

  // Apply all the changes to the database.
  try {
    await Promise.all([
      VatsimATISModel.bulkSave([...dataToAdd, ...dataToUpdate], { ordered: false }),
      VatsimATISModel.deleteMany({
        callsign: {
          $in: dataToDelete,
        },
      }),
    ]);
  } catch (error) {
    logMongoBulkErrors(logger, error);
  }

  profiler.done({
    message: `Done processing ${_.size(incomingData)} incoming VATSIM ATISes`,
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
