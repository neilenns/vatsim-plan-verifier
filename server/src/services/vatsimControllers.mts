import { PromisePool } from "@supercharge/promise-pool";
import _ from "lodash";
import { type IVatsimController, type IVatsimData } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import {
  VatsimControllerModel,
  type VatsimControllerDocument,
} from "../models/VatsimController.mjs";
import { logMongoBulkErrors } from "../utils.mjs";

const logger = mainLogger.child({ service: "vatsimControllers" });

// Takes a controller object from vatsim and converts it to a model
export async function controllerToVatsimModel(
  controller: IVatsimController
): Promise<VatsimControllerDocument> {
  const result = new VatsimControllerModel({
    cid: controller.cid,
    name: controller?.name,
    callsign: controller?.callsign ?? "",
    rating: controller.rating,
    facility: controller.facility,
    frequency: controller.frequency,
    logonTime: controller.logon_time,
    rawText: controller.text_atis,
  });

  // Set properties that need to be calculated
  await result.setArtcc();

  return result;
}

/**
 * Builds the  list of VatsimControllerDocuments to add.
 * @param currentControllers The list of current controllers
 * @param incomingControllers The list of incoming controllers
 * @returns An array of the controllers to add
 */
async function calculateNew(
  currentControllers: _.Dictionary<VatsimControllerDocument>,
  incomingControllers: _.Dictionary<IVatsimController>
): Promise<VatsimControllerDocument[]> {
  let profiler = logger.startTimer();

  const controllersToAdd: VatsimControllerDocument[] = [];

  profiler = logger.startTimer();

  await PromisePool.withConcurrency(10)
    .for(Object.values(incomingControllers))
    .handleError(async (error, incomingController) => {
      logger.error(
        `Unable to calculate new and updated for ${incomingController.callsign}: ${error.message}`,
        error
      );
    })
    .process(async (incomingController: IVatsimController) => {
      const currentController = currentControllers[incomingController.callsign];
      if (currentController === undefined) {
        const newController = await controllerToVatsimModel(incomingController);

        controllersToAdd.push(newController);
      }
    });

  profiler.done({
    level: "debug",
    message: `Done calculating new controllers: ${controllersToAdd.length} new`,
  });

  return controllersToAdd;
}

function calculateDeleted(
  currentControllers: _.Dictionary<VatsimControllerDocument>,
  incomingControllers: _.Dictionary<IVatsimController>
): string[] {
  const profiler = logger.startTimer();

  // controllersToDelete is just an array of callsigns since that's all that has to be passed
  // in the database call to delete them. No need to return full controller documents
  // and then map over them later to get the callsigns.
  const controllersToDelete: string[] = [];

  for (const key in currentControllers) {
    // This is fine, it's a Dictionary.
    // eslint-disable-next-line security/detect-object-injection
    const deletedOnServer = incomingControllers[key] === undefined;

    // If the controller wasn't deleted then just return
    if (!deletedOnServer) continue;

    // This is fine, it's a Dictionary.
    // eslint-disable-next-line security/detect-object-injection
    const currentController = currentControllers[key];

    controllersToDelete.push(currentController.callsign);
  }

  profiler.done({
    level: "debug",
    message: `Done calculating deleted controllers: ${controllersToDelete.length} to delete`,
  });

  return controllersToDelete;
}

// Takes the massive list of data from vatsim and processes it into the database.
export async function processVatsimControllersData(vatsimData: IVatsimData): Promise<void> {
  const overallProfiler = logger.startTimer();
  let profiler = logger.startTimer();

  logger.info(`Processing ${vatsimData.controllers.length} incoming VATSIM controllers `, {
    controllers: vatsimData.controllers.length,
  });

  // Build a dictionary of all the incoming controllers for use with the rest of the update logic.
  const incomingControllers = _.keyBy(vatsimData.controllers, "callsign");

  // Find all the current controllers in the database to use when figuring out
  // what updates to apply and convert them to a dictionary to speed access later.
  profiler = logger.startTimer();
  const currentControllers = _.keyBy(await VatsimControllerModel.find({}), "callsign");
  profiler.done({ level: "debug", message: "Done loading current controllers from the database" });

  // Build the lists of data to add, update, and delete.
  const controllersToAdd = await calculateNew(currentControllers, incomingControllers);

  const controllersToDelete = calculateDeleted(currentControllers, incomingControllers);

  // Apply all the changes to the database.
  profiler = logger.startTimer();
  try {
    await Promise.all([
      VatsimControllerModel.bulkSave(controllersToAdd, {
        ordered: false,
      }),
      VatsimControllerModel.deleteMany({
        callsign: {
          $in: controllersToDelete,
        },
      }),
    ]);
  } catch (error) {
    logMongoBulkErrors(logger, error);
  }
  profiler.done({ level: "debug", message: `Done processing database updates` });

  overallProfiler.done({
    message: `Done processing ${_.size(incomingControllers)} incoming VATSIM controllers`,
    counts: {
      current: _.size(currentControllers),
      deleted: controllersToDelete.length,
      incoming: _.size(incomingControllers),
      new: controllersToAdd.length,
    },
  });
}
