import _ from "lodash";
import { DateTime } from "luxon";
import { ENV } from "../env.mjs";
import { IVatsimData, IVatsimPilot } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { AirportInfoModel } from "../models/AirportInfo.mjs";
import {
  VatsimCommunicationMethod,
  VatsimFlightPlanDocument,
  VatsimFlightPlanModel,
  VatsimFlightStatus,
} from "../models/VatsimFlightPlan.mjs";
import { cleanRoute, depTimeToDateTime, getCommunicationMethod } from "../utils/vatsim.mjs";

const logger = mainLogger.child({ service: "vatsimFlightPlans" });

// List of the properties on a vatsim flight plan that are eligible to
// be updated when new data is received. departure airport is intentionally
// not in this list as it is updated separately as part of the fix for issue 672.
// latitude, longitude, and groundspeed are not in this list and are handled
// separately as part of the fix for issue 982.
const updateProperties = [
  "flightRules",
  "name",
  "rawAircraftType",
  "departure",
  "arrival",
  "route",
  "squawk",
  "remarks",
  "isPrefile",
  "cruiseAltitude",
  "communicationMethod",
  "departureTime",
] as (keyof VatsimFlightPlanDocument)[];

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

  // Handle all the new and upated plans first
  profiler = logger.startTimer();
  // Doing waits inside a loop is a recipe for extremely slow performance. Instead return promises
  // and await them all at once. This method comes from https://dev.to/imichaelowolabi/this-is-why-your-nodejs-application-is-slow-206j.
  await Promise.all(
    _.map(incomingPlans, async (incomingPlan, key) => {
      try {
        const incomingPlan = incomingPlans[key];
        const currentPlan = currentPlans[incomingPlan.callsign];

        // If it's not found then it's a new plan so just make the model object and add it to
        // the new plan array.
        if (!currentPlan) {
          const newPlan = pilotToVatsimModel(incomingPlan);
          // Important to set the initial flight status for the new plan. It could be in the air
          // or already arrived.
          // await updateFlightStatus(newPlan);
          plansToAdd.push(newPlan);
          return;
        }

        // This means it's an existing plan so we need to update properties. This return
        // and .then() is the magic that lets all of the promises run in parallel instead of
        // blocking the for loop awaiting every single updated flight plan, of which there
        // are typically 1000+.
        return currentPlan
          .updateFlightPlan(incomingPlan)
          .then(() => plansToUpdate.push(currentPlan));
      } catch (error) {
        logger.error(error);
      }
    })
  );

  profiler.done({ message: "Done creating list of new and updated plans" });

  return [plansToAdd, plansToUpdate];
}

// Takes the massive list of data from vatsim and processes it into the database.
// Both pilots (a.k.a flight plans) and prefiles are processed.
export async function processVatsimFlightPlanData(vatsimData: IVatsimData) {
  const overallProfiler = logger.startTimer();
  let profiler = logger.startTimer();

  // Build a dictionary of all the incoming plans, regardless of whether it's a prefile,
  // for use with the rest of the update logic. The dictionary is used when looking
  // for planes that were deleted.
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

  logger.info(`Processing ${_.size(incomingPlans)} incoming VATSIM flight plans`);
  profiler.done({ message: "Done creating list from incoming plans" });

  profiler = logger.startTimer();
  // Find all the callsigns for the current plans in the database to use when figuring out
  // what updates to apply and convert them to a dictionary to speed access later.
  const currentPlans = _.keyBy(await VatsimFlightPlanModel.find({}), "callsign");
  profiler.done({ message: "Done loading current plans from the database" });

  const plansToDelete: VatsimFlightPlanDocument[] = [];
  let coastingCount = 0;
  let savedDataCount = 0;

  const [plansToAdd, plansToUpdate] = await calculateNewAndUpdated(currentPlans, incomingPlans);

  // Now look for deleted plans
  profiler = logger.startTimer();
  for (const key in currentPlans) {
    const deletedOnServer = incomingPlans[key] === undefined;

    // If the plan wasn't deleted then just return, it was either new or updated.
    if (!deletedOnServer) continue;

    // Since the plan was deleted it needs its coast value calculated. If it
    // is coasting add it to the updated plans list. If it wasn't then it's really gone
    // and add it to the deleted plans list.
    const currentPlan = currentPlans[key];

    currentPlan.setCoast();
    if (currentPlan.isCoasting) {
      plansToUpdate.push(currentPlan);
      coastingCount++;
    } else {
      plansToDelete.push(currentPlan);
    }
  }
  profiler.done({ message: "Done calculating deleted and coast plans" });

  profiler = logger.startTimer();
  try {
    // Save all the changes to the database
    await Promise.all([
      // Delete the non-coasting plans
      await VatsimFlightPlanModel.deleteMany({
        callsign: {
          $in: plansToDelete.map((plan) => plan.callsign),
        },
      }),

      // Add the new plans
      await Promise.all([...plansToAdd.map(async (plan) => await plan.save())]),

      // Update the changed plans. This has to be done via save() to ensure middleware runs.
      await Promise.all([
        ...plansToUpdate.map(async (plan) => {
          // Issue 982: Turns out the save() method isn't smart and still does something even if there are
          // no modifications, which slows things down a TON. Check for modifications before calling save.
          const wasUpdated = await plan.saveIfModified();
          if (wasUpdated) savedDataCount++;
        }),
      ]),
    ]);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error updating flight plans: ${err.message}`);
  }
  profiler.done({ message: `Done processing database updates` });

  logger.debug(
    `Total deleted from server: ${plansToDelete.length} (${coastingCount} coasting and ${plansToDelete.length} to delete)`
  );

  logger.debug(`Saved ${savedDataCount} updated plans`, { savedDataCount });

  overallProfiler.done({
    message: `Done processing ${_.size(incomingPlans)} incoming VATSIM flight plans`,
    counts: {
      current: _.size(currentPlans),
      incoming: _.size(incomingPlans),
      new: plansToAdd.length,
      updated: plansToUpdate.length,
      deleted: plansToDelete.length,
      coasting: coastingCount,
      saved: savedDataCount,
    },
  });
}
