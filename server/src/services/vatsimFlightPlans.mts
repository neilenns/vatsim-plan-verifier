import _ from "lodash";
import { IVatsimData, IVatsimPilot } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { VatsimFlightPlanDocument, VatsimFlightPlanModel } from "../models/VatsimFlightPlan.mjs";
import { cleanRoute, depTimeToDateTime, getCommunicationMethod } from "../utils/vatsim.mjs";
import { logMongoBulkErrors } from "../utils.mjs";

const logger = mainLogger.child({ service: "vatsimFlightPlans" });

// Counts how many incoming flight plans wind up not being modified because their
// data didn't change from what was already in the database.
let unchangedCount = 0;

// Takes a pilot object from vatsim and converts it to a vatsim model
export function pilotToVatsimModel(pilot: IVatsimPilot) {
  const result = new VatsimFlightPlanModel({
    cid: pilot.cid,
    name: pilot?.name,
    isPrefile: pilot.isPrefile,
    callsign: pilot?.callsign ?? "",
    groundspeed: pilot?.groundspeed ?? "",
    rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
    departure: pilot?.flight_plan?.departure,
    departureTime: depTimeToDateTime(pilot?.flight_plan?.deptime),
    arrival: pilot?.flight_plan?.arrival ?? "",
    latitude: pilot?.latitude,
    longitude: pilot?.longitude,
    route: cleanRoute(pilot?.flight_plan?.route ?? ""),
    squawk: pilot?.flight_plan?.assigned_transponder ?? "",
    remarks: pilot?.flight_plan?.remarks ?? "",
  });

  result.communicationMethod = getCommunicationMethod(result?.remarks);

  result.setCruiseAltitudeAndFlightRules(
    pilot?.flight_plan?.altitude,
    pilot?.flight_plan?.flight_rules
  );

  return result;
}

/**
 * Builds the  list of VastimFlightPlanDocuments to add and update based on the current plans and the incoming plans.
 * @param currentPlans The list of current plans
 * @param incomingPlans The list of incoming plans
 * @returns A tuple [plansToAdd, plansToUpdate] that are arrays of the plans to add and plans to update
 */
async function calculateNewAndUpdated(
  currentPlans: _.Dictionary<VatsimFlightPlanDocument>,
  incomingPlans: _.Dictionary<IVatsimPilot>
) {
  let profiler = logger.startTimer();

  const plansToAdd: VatsimFlightPlanDocument[] = [];
  const plansToUpdate: VatsimFlightPlanDocument[] = [];

  profiler = logger.startTimer();

  // Doing awaits inside a loop is a recipe for extremely slow performance. Instead return promises
  // and await them all at once. This method comes from https://dev.to/imichaelowolabi/this-is-why-your-nodejs-application-is-slow-206j.
  await Promise.all(
    _.map(incomingPlans, async (incomingPlan, key) => {
      try {
        const currentPlan = currentPlans[incomingPlan.callsign];

        // If it's not found then it's a new plan so just make the model object and add it to
        // the new plan array.
        if (!currentPlan) {
          const newPlan = pilotToVatsimModel(incomingPlan);
          // Important to set the initial flight status for the new plan. It could be in the air
          // or already arrived when it first appears in the list from VATSIM.
          return newPlan.updateFlightStatus().then(() => {
            plansToAdd.push(newPlan);
            return;
          });
        }

        // This means it's an existing plan so we need to update properties. This return
        // and .then() is the magic that lets all of the promises run in parallel instead of
        // blocking the for loop awaiting every single updated flight plan, of which there
        // are typically 1000+.
        return currentPlan.updateFlightPlan(incomingPlan).then(() => {
          // Only add to update list if something changed. This saves a huge amount of
          // execution time by avoiding unnecessary saves back to the database.
          if (currentPlan.isModified()) {
            plansToUpdate.push(currentPlan);
          } else {
            unchangedCount++;
          }
        });
      } catch (error) {
        logger.error(error);
      }
    })
  );

  profiler.done({
    level: "debug",
    message: `Done calculating new and updated plans: ${plansToAdd.length} new and ${plansToUpdate.length} to update`,
  });

  return [plansToAdd, plansToUpdate];
}

function calculateDeletedAndCoasting(
  currentPlans: _.Dictionary<VatsimFlightPlanDocument>,
  incomingPlans: _.Dictionary<IVatsimPilot>
): [string[], VatsimFlightPlanDocument[]] {
  let profiler = logger.startTimer();

  let totalDeleted = 0;
  let alreadyCoasting = 0;

  // plansToDelete is just an array of callsigns since that's all that has to be passed
  // in the database call to delete them. No need to return full flight plan documents
  // and then map over them later to get the callsigns.
  const plansToDelete: string[] = [];
  const plansToCoast: VatsimFlightPlanDocument[] = [];

  for (const key in currentPlans) {
    const deletedOnServer = incomingPlans[key] === undefined;

    // If the plan wasn't deleted then just return, it was either new or updated.
    if (!deletedOnServer) continue;

    totalDeleted++;

    // Since the plan was deleted it needs its coast value calculated. If it
    // is coasting add it to the updated plans list. If it wasn't then it's really gone
    // and add it to the deleted plans list.
    const currentPlan = currentPlans[key];

    currentPlan.setCoast();

    // Don't add a plane to the coasting list if it was already coasting. This avoids unnecessary database
    // saves for coasting planes that don't need updating.
    if (currentPlan.isCoasting && currentPlan.isModified("coastAt")) {
      plansToCoast.push(currentPlan);
    }
    // Planes no longer coasting get deleted
    else if (!currentPlan.isCoasting) {
      plansToDelete.push(currentPlan.callsign);
    } else {
      alreadyCoasting++;
    }
  }

  profiler.done({
    level: "debug",
    message: `Done calculating deleted and coast plans: ${totalDeleted} on server, ${plansToDelete.length} to delete, ${plansToCoast.length} to coast, ${alreadyCoasting} already coasting`,
  });

  return [plansToDelete, plansToCoast];
}

// Takes the massive list of data from vatsim and processes it into the database.
// Both pilots (a.k.a flight plans) and prefiles are processed.
export async function processVatsimFlightPlanData(vatsimData: IVatsimData) {
  const overallProfiler = logger.startTimer();
  let profiler = logger.startTimer();

  logger.info(
    `Processing ${
      vatsimData.pilots.length + vatsimData.prefiles.length
    } incoming VATSIM flight plans `,
    {
      flightPlans: vatsimData.pilots.length,
      prefiles: vatsimData.prefiles.length,
    }
  );

  // Build a dictionary of all the incoming plans, regardless of whether it's a prefile,
  // for use with the rest of the update logic.
  const incomingPlans = _.keyBy(
    [
      ...vatsimData.pilots,
      // The prefiles need the isPrefile flag set on them for use later on
      ...vatsimData.prefiles.map((prefile) => {
        return {
          ...prefile,
          isPrefile: true,
        };
      }),
    ],
    "callsign"
  );

  // Find all the current plans in the database to use when figuring out
  // what updates to apply and convert them to a dictionary to speed access later.
  profiler = logger.startTimer();
  const currentPlans = _.keyBy(await VatsimFlightPlanModel.find({}), "callsign");
  profiler.done({ level: "debug", message: "Done loading current plans from the database" });

  // Build the lists of data to add, update, and delete.
  const [plansToAdd, plansToUpdate] = await calculateNewAndUpdated(currentPlans, incomingPlans);
  const [plansToDelete, plansToCoast] = calculateDeletedAndCoasting(currentPlans, incomingPlans);

  // Apply all the changes to the database.
  profiler = logger.startTimer();
  try {
    await Promise.all([
      VatsimFlightPlanModel.bulkSave([...plansToAdd, ...plansToUpdate, ...plansToCoast], {
        ordered: false,
      }),
      VatsimFlightPlanModel.deleteMany({
        callsign: {
          $in: plansToDelete,
        },
      }),
    ]);
  } catch (error) {
    logMongoBulkErrors(logger, error);
  }
  profiler.done({ level: "debug", message: `Done processing database updates` });

  overallProfiler.done({
    message: `Done processing ${_.size(incomingPlans)} incoming VATSIM flight plans`,
    counts: {
      coasting: plansToCoast.length,
      current: _.size(currentPlans),
      deleted: plansToDelete.length,
      incoming: _.size(incomingPlans),
      new: plansToAdd.length,
      unchanged: unchangedCount,
      updated: plansToUpdate.length,
    },
  });
}
