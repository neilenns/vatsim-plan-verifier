import { isDocument } from "@typegoose/typegoose";
import _ from "lodash";
import mainLogger from "../../logger.mjs";
import { AircraftDocument } from "../../models/Aircraft.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { AirportFlow } from "../../models/InitialAltitude.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "checkSEAInitialSID";
const logger = mainLogger.child({ service: verifierName });

type InitialSid = {
  SID: string;
  extendedMessage: string;
};

/**
 * Calculates the initial KSEA SID for a flight plan. Broken out into its own
 * small function to enable unit testing.
 * @param flightPlan
 * @returns The InitialSid or undefined if none apply
 */
export function calculateInitialSID(flightPlan: FlightPlan): InitialSid | undefined {
  // Jets get one set of rules. The HondaJet (HDJT) is not a jet.
  if (
    (flightPlan.equipmentInfo! as AircraftDocument).engineType === "J" &&
    flightPlan.equipmentCode != "HDJT"
  ) {
    return calculateInitialSIDForJets(flightPlan);
  }
  // Everything else gets the other rules
  else {
    return calculateInitialSIDForNotJets(flightPlan);
  }
}

/**
 * Figures out the initial SID for a KSEA departing aircraft regardless of aircraft group.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route and reason why, or undefined if none could be deteremind
 */
function calculateInitialSidAllGroups(flightPlan: FlightPlan): InitialSid | undefined {
  // HAROB ABV FL240
  if (
    flightPlan.cruiseAltitude > 240 &&
    (flightPlan.routeParts.includes("HAROB") || flightPlan.routeParts.includes("HAROB6"))
  ) {
    return { SID: "HAROB6", extendedMessage: "All: HAROB ABV FL240" };
  }

  // BANGR ABV 100
  if (
    flightPlan.cruiseAltitude > 100 &&
    (flightPlan.routeParts.includes("BANGR") || flightPlan.routeParts.includes("BANGR9"))
  ) {
    return { SID: "BANGR9", extendedMessage: "All: BANGR ABV 100" };
  }

  // V2/V298/SEA 088R BLO FL230
  if (
    flightPlan.cruiseAltitude < 230 &&
    _.intersection(flightPlan.routeParts, ["V2", "V298"]).length > 0
  ) {
    return { SID: "MONTN2", extendedMessage: "All: Reroute on J20. V2/V298/SEA 088R BLO FL230." };
  }

  // J5/SEA 146R ABV FL230
  if (flightPlan.cruiseAltitude > 230 && flightPlan.routeParts.includes("J5")) {
    return { SID: "SUMMA2", extendedMessage: "All: Reroute on J20. J5/SEA 146R ABV FL230." };
  }

  // V27/J70/SEA 230R BTW 100-FL230
  if (
    flightPlan.cruiseAltitude > 100 &&
    flightPlan.cruiseAltitude < 230 &&
    _.intersection(flightPlan.routeParts, ["V27", "J70"]).length > 0
  ) {
    return { SID: "ELMAA4", extendedMessage: "All: V27/J70/SEA 230R BTW 100-FL230" };
  }

  // J70/SEA 230R ABV FL230
  if (flightPlan.cruiseAltitude > 230 && flightPlan.routeParts.includes("J70")) {
    return { SID: "ELMAA4", extendedMessage: "All: J70/SEA 230R ABV FL230" };
  }

  // J523/SEA 281R ABV 100
  if (flightPlan.cruiseAltitude > 100 && flightPlan.routeParts.includes("J523")) {
    return { SID: "SEA8", extendedMessage: "All: J523/SEA 281R" };
  }

  // J523/SEA 281R BLW 100
  if (
    flightPlan.cruiseAltitude < 100 &&
    _.intersection(flightPlan.routeParts, ["V4", "V495"]).length > 0
  ) {
    return { SID: "SEA8", extendedMessage: "All: V4/V495/SEA 310R BLW 100" };
  }

  return undefined;
}

/**
 * Figures out the initial SID for a KSEA departing jet (non HDJT) aircraft.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route and reason why, or undefined if none could be deteremind
 */
export function calculateInitialSIDForJets(flightPlan: FlightPlan): InitialSid | undefined {
  // V23/RV to PAE
  if (flightPlan.routeParts.includes("PAE")) {
    if (flightPlan.flow === AirportFlow.South) {
      return { SID: "MONTN2", extendedMessage: "Group A: V23/RV to PAE (South)" };
    }
    if (flightPlan.flow === AirportFlow.North) {
      return { SID: "SEA8", extendedMessage: "Group A: V23/RV to PAE (North)" };
    }
  }

  // ZADON
  if (flightPlan.routeParts.includes("ZADON")) {
    return { SID: "MONTN2", extendedMessage: "Group A: ZADON" };
  }

  // J12/J70/J90/RV to NORMY
  if (flightPlan.routeParts.includes("NORMY")) {
    return { SID: "MONTN2", extendedMessage: "Group A: J12/J70/J90/RV to NORMY" };
  }

  // HELENS/SEA 161R. This is a hack, it should be Group A and B but is really only testing Group A.
  if (flightPlan.routeParts.includes("HELENS")) {
    return { SID: "SEA8", extendedMessage: "Group A, B: HELENS/SEA 161R" };
  }

  // No jet-specific rules applied so try the common ones.
  return calculateInitialSidAllGroups(flightPlan);
}

/**
 * Figures out the initial SID for a KSEA departing non-jet (including HDJT) aircraft.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route or undefined if none could be deteremind.
 */
export function calculateInitialSIDForNotJets(flightPlan: FlightPlan): InitialSid | undefined {
  // V23/RV to PAE 110 & BLO
  if (flightPlan.routeParts.includes("PAE") && flightPlan.cruiseAltitude <= 110) {
    return { SID: "MONTN2", extendedMessage: "Group B, C, D: V23/RV to PAE 110 & BLO" };
  }

  // V23/RV to PAE 120 & ABV
  if (flightPlan.routeParts.includes("PAE") && flightPlan.cruiseAltitude >= 120) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: V23/RV to PAE 120 & ABV" };
  }

  // J503/RV
  if (flightPlan.routeParts.includes("J503")) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: J503/RV" };
  }

  // V120/J12/J70/J90/SEA 072R
  if (_.intersection(flightPlan.routeParts, ["V120", "J12", "J70", "J90"]).length > 0) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: V120/J12/J70/J90/SEA 072R" };
  }

  // V495/J1/SEA 168R BTW 100-FL230
  if (
    flightPlan.cruiseAltitude > 100 &&
    flightPlan.cruiseAltitude < 230 &&
    _.intersection(flightPlan.routeParts, ["V495", "J1"]).length > 0
  ) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: V495/J1/SEA 168R BTW 100-FL230" };
  }

  // V23/SEA 178R BLO 100
  if (flightPlan.cruiseAltitude < 100 && flightPlan.routeParts.includes("V23")) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: V23/SEA 178R BLO 100" };
  }

  // OLM.V287, OLM.V165, OLM.V187
  if (
    flightPlan.routeParts.includes("OLM") &&
    _.intersection(flightPlan.routeParts, ["V287", "V165", "V187"]).length > 0
  ) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: OLM.V287, OLM.V165, OLM.V187" };
  }

  return calculateInitialSidAllGroups(flightPlan);
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
    await result.data.save();
    return result;
  }

  // Airport flow must be north or south
  if (flightPlan.flow !== AirportFlow.North && flightPlan.flow !== AirportFlow.South) {
    result.data.status = VerifierResultStatus.ERROR;
    result.data.message = `Unable to calcluate initial SID since the airport flow isn't north or south.`;
    result.data.messageId = "unknownAirportFlow";
    await result.data.save();
    return result;
  }

  // Need to know the engine type too
  if (!isDocument(flightPlan.equipmentInfo) || flightPlan.equipmentInfo.engineType === "U") {
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Unable to calcluate initial SID since the engine type isn't known.`;
    result.data.messageId = "unknownEngineType";
    await result.data.save();
    return result;
  }

  // Need to know the equipment code too
  if (!flightPlan.equipmentCode || flightPlan.equipmentCode === "") {
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Unable to calcluate initial SID since the equipment code isn't known.`;
    result.data.messageId = "unknownEquipmentCode";
    result.data.priority = 3;
    await result.data.save();
  }

  try {
    const requiredSID = calculateInitialSID(flightPlan);

    // This is the test the verifier is supposed to do.
    if (!requiredSID) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `No explicit SID rules exist, assuming the filed one is correct.`;
      result.data.priority = 3;
      result.data.messageId = "noSIDrule";
    } else if (requiredSID.SID !== flightPlan.SID) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.priority = 3;
      result.data.message = `Flight should be on the ${requiredSID.SID} SID.`;
      result.data.extendedMessage = [requiredSID.extendedMessage];
      result.data.messageId = "incorrectKSEASID";
    } else {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.priority = 5;
      result.data.message = `Flight is on a SID that matches a rule for the filed route.`;
      result.data.messageId = "correctKSEASID";
    }

    await result.data.save();
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running checkSEAInitialSID: ${error.message}`, error);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkSEAInitialSID: ${error.message}`,
    };
  }

  return result;
}
