import { isDocument } from "@typegoose/typegoose";
import _ from "lodash";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { AirportFlow } from "../../models/InitialAltitude.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "checkSEAInitialSID";
const logger = mainLogger.child({ service: verifierName });

/**
 * Figures out the initial SID for a KSEA departing jet (non HDJT) aircraft.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route or undefined if none could be deteremind.
 */
export function calculateInitialSIDForJets(flightPlan: FlightPlan): string | undefined {
  // North flow specific tests
  if (flightPlan.flow === AirportFlow.North) {
    // If NORMY or ZADON is in the route then it's clearly getting MONTN2.
    if (_.intersection(flightPlan.routeParts, ["NORMY", "ZADON"]).length > 0) {
      return "MONTN2";
    }
  }

  // South flow specific tests
  if (flightPlan.flow === AirportFlow.South) {
    // If PAE, ALPSE, NORMY, ZADON is in the route then it's clearly getting MONTN2.
    if (_.intersection(flightPlan.routeParts, ["PAE", "ALPSE", "NORMY", "ZADON"]).length > 0) {
      return "MONTN2";
    }
  }

  // The following tests apply regardless of flow

  // If HAROB is in the flight plan then they get HAROB6.
  if (flightPlan.routeParts.includes("HAROB")) {
    return "HAROB6";
  }

  // If BANGR is in the flight plan then they get BANGR6.
  if (flightPlan.routeParts.includes("BANGR")) {
    return "BANGR6";
  }

  // Any plane headed eastbound on V2/V298/V120 gets MONTN2. This assumes all planes
  // departing KSEA with one of these airways in their flight plan is heading eastbound.
  if (_.intersection(flightPlan.routeParts, ["V2", "V298", "V120"]).length > 0) {
    return "MONTN2";
  }

  // Any plane headed eastbound on V27/J70 between 100 and FL230 gets ELMAA4. This assumes all planes
  // departing KSEA with one of these airways in their flight plan is heading eastbound.
  if (
    _.intersection(flightPlan.routeParts, ["V27", "J70"]).length > 0 &&
    flightPlan.cruiseAltitude > 100 &&
    flightPlan.cruiseAltitude < 230
  ) {
    return "ELMAA4";
  }

  // Any plane headed eastbound on J5 gets SUMMA above FL230 and MONTN2 below FL230.
  // This assumes all planes departing KSEA with this airway in their flight plan is heading eastbound.
  if (flightPlan.routeParts.includes("J5")) {
    if (flightPlan.cruiseAltitude > 230) {
      return "SUMMA2";
    } else if (flightPlan.cruiseAltitude < 230) {
      return "MONTN2";
    }

    return undefined;
  }

  // Everything else gets SEA8
  return "SEA8";
}

/**
 * Figures out the initial SID for a KSEA departing non-jet (including HDJT) aircraft.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route or undefined if none could be deteremind.
 */
export function calculateInitialSIDForNotJets(flightPlan: FlightPlan): string | undefined {
  if (flightPlan.flow === AirportFlow.North) {
    // If PAE is in the route and they are at or below 110 then MONTN2
    if (flightPlan.routeParts.includes("PAE") && flightPlan.cruiseAltitude <= 110) {
      return "MONTN2";
    }
  }

  // The following tests apply regardless of flow

  // If HAROB is in the flight plan then they get HAROB6.
  if (flightPlan.routeParts.includes("HAROB")) {
    return "HAROB6";
  }

  // If BANGR is in the flight plan then they get BANGR6.
  if (flightPlan.routeParts.includes("BANGR")) {
    return "BANGR6";
  }

  // Any plane headed eastbound on V27/J70 above 100 gets ELMAA4. This assumes all planes
  // departing KSEA with one of these airways in their flight plan is heading eastbound.
  if (
    _.intersection(flightPlan.routeParts, ["V27", "J70"]).length > 0 &&
    flightPlan.cruiseAltitude > 100
  ) {
    return "ELMAA4";
  }

  // Any plane headed eastbound on J5 gets SUMMA above FL230 and MONTN2 below FL230.
  // This assumes all planes departing KSEA with this airway in their flight plan is heading eastbound.
  if (flightPlan.routeParts.includes("J5")) {
    if (flightPlan.cruiseAltitude > 230) {
      return "SUMMA2";
    } else if (flightPlan.cruiseAltitude < 230) {
      return "MONTN2";
    }

    return undefined;
  }

  // Everything else gets SEA8
  return "SEA8";
}

export default async function checkSEAInitialSID(
  flightPlan: FlightPlan
): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResultModel({
      flightPlanId: flightPlan._id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  // Only applies to Seattle flights
  if (flightPlan.departure !== "KSEA") {
    result.data.status = VerifierResultStatus.INFORMATION;
    result.data.message = `Flight isn't departing KSEA.`;
    result.data.messageId = "notDepartingKSEA";
    return result;
  }

  // Can't be calculated without a route
  if (!flightPlan.routeParts || flightPlan.routeParts.length === 0) {
    result.data.status = VerifierResultStatus.INFORMATION;
    result.data.message = `No route provided.`;
    result.data.messageId = "noRoute";
    return result;
  }

  // Airport flow must be north or south
  if (flightPlan.flow !== AirportFlow.North && flightPlan.flow !== AirportFlow.South) {
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Unable to calcluate initial SID since the airport flow isn't north or south.`;
    result.data.messageId = "unknownAirportFlow";
    return result;
  }

  // Need to know the engine type too
  if (!isDocument(flightPlan.equipmentInfo) || flightPlan.equipmentInfo.engineType === "U") {
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Unable to calcluate initial SID since the engine type isn't known.`;
    result.data.messageId = "unknownEngineType";
    return result;
  }

  // Need to know the equipment code too
  if (!flightPlan.equipmentCode || flightPlan.equipmentCode === "") {
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Unable to calcluate initial SID since the equipment code isn't known.`;
    result.data.messageId = "unknownEquipmentCode";
    return result;
  }

  try {
    let requiredSID: string | undefined;

    // Jets get one set of rules. The HondaJet (HDJT) is not a jet.
    if (flightPlan.equipmentInfo.engineType === "J" && flightPlan.equipmentCode != "HDJT") {
      requiredSID = calculateInitialSIDForJets(flightPlan);
    } else {
      requiredSID = calculateInitialSIDForNotJets(flightPlan);
    }

    // This is the test the verifier is supposed to do.
    if (!requiredSID) {
      result.data.status = VerifierResultStatus.WARNING;
      result.data.message = `Unable to calculate required SID.`;
      result.data.priority = 3;
      result.data.messageId = "unableToCalculateRequiredSID";
    } else if (requiredSID !== flightPlan.SID) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.priority = 3;
      result.data.message = `Flight should be on the ${requiredSID} SID.`;
      result.data.messageId = "incorrectKSEASID";
    } else {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.priority = 5;
      result.data.message = `Flight is on the correct SID.`;
      result.data.messageId = "correctKSEASID";
    }

    await result.data.save();
  } catch (error) {
    const err = error as Error;
    logger.error(`Error running checkSEAInitialSID: ${err.message}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkSEAInitialSID: ${err.message}`,
    };
  }

  return result;
}
