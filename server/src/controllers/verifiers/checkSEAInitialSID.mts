import { isDocument } from "@typegoose/typegoose";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import _ from "lodash";
import mainLogger from "../../logger.mjs";
import { type AircraftDocument } from "../../models/Aircraft.mjs";
import { type FlightPlan } from "../../models/FlightPlan.mjs";
import { AirportFlow } from "../../models/InitialAltitude.mjs";
import { NavaidModel } from "../../models/Navaid.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";
import type VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "checkSEAInitialSID";
const logger = mainLogger.child({ service: verifierName });

type InitialSid =
  | {
      SID: string;
      extendedMessage: string;
    }
  | undefined;

// Used to find the first fix in a route that isn't an airway. Airways
// start with J, Q, T, or V and are followed by digits.
const airwayRegex = /^([JQTV]\d+$)/;

async function calculateDirectionOfFlight(flightPlan: FlightPlan): Promise<number | undefined> {
  const firstFix = flightPlan.routeParts.find(
    (part) => part !== "SEA" && part !== "DCT" && part !== flightPlan.SID && !airwayRegex.test(part)
  );

  if (firstFix == null) {
    return;
  }

  const firstFixInfo = await NavaidModel.findOne({ ident: firstFix }).cacheQuery({
    ttl: 60 * 10,
  }); // 10 minutes

  if (firstFixInfo == null) {
    return;
  }

  // Lat and long of the SEA VORTAC
  const seaVorLatLong = new LatLon(47.4353789430252, -122.309632349265);
  const firstFixLatLong = new LatLon(firstFixInfo.latitude, firstFixInfo.longitude);

  // -15.17729 is the magnetic declination at KSEA on 2024-02-25
  const rawBearing = seaVorLatLong.initialBearingTo(firstFixLatLong) + -15.17729;

  // Force the final value to be between 0 and 359
  const directionOfFlight = Math.round(rawBearing < 0 ? rawBearing + 360 : rawBearing) % 360;

  return directionOfFlight;
}
/**
 * Calculates the initial KSEA SID for a flight plan. Broken out into its own
 * small function to enable unit testing.
 * @param flightPlan
 * @returns The InitialSid or undefined if none apply
 */
export async function calculateInitialSID(flightPlan: FlightPlan): Promise<InitialSid> {
  // Try and calculate the direction of flight between SEA VOR and the first fix in the route.
  // If that can't be calculated for some reason fall back to the direction of flight
  // between KSEA and the arrival airport.
  const directionOfFlight =
    (await calculateDirectionOfFlight(flightPlan)) ?? flightPlan.directionOfFlight;

  if (directionOfFlight == null) {
    return undefined;
  }

  let initialSid: InitialSid;
  // Jets get one set of rules. The HondaJet (HDJT) is not a jet.
  if (
    (flightPlan.equipmentInfo as AircraftDocument).engineType === "J" &&
    flightPlan.equipmentCode !== "HDJT"
  ) {
    initialSid = calculateInitialSIDForJets(flightPlan, directionOfFlight);
  }
  // Everything else gets the other rules
  else {
    initialSid = calculateInitialSIDForNotJets(flightPlan, directionOfFlight);
  }

  // If the jet or non-jet specific checks didn't find anything then check
  // against the common rules.
  if (initialSid == null) {
    initialSid = calculateInitialSidAllGroups(flightPlan, directionOfFlight);
  }

  return initialSid;
}

/**
 * Figures out the initial SID for a KSEA departing aircraft regardless of aircraft group.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route and reason why, or undefined if none could be deteremind
 */
function calculateInitialSidAllGroups(
  flightPlan: FlightPlan,
  directionOfFlight: number
): InitialSid | undefined {
  // This is checked before SUMMA2 in case a flight is on V2/V298.
  // V2/V298/SEA 088R BLO FL230
  if (
    flightPlan.cruiseAltitude < 230 &&
    _.intersection(flightPlan.routeParts, ["V2", "V298"]).length > 0
  ) {
    return { SID: "MONTN2", extendedMessage: "All: Reroute on J20. V2/V298/SEA 088R BLO FL230." };
  }

  // This is checked first so flights on the SUMMA2 that eventually join J70 don't wind up
  // getting the ELMAA4 departure.
  // (104-160) J5/SEA 146R
  if (directionOfFlight >= 104 && directionOfFlight <= 160) {
    if (flightPlan.cruiseAltitude > 230 && flightPlan.routeParts.includes("J5")) {
      return {
        SID: "SUMMA2",
        extendedMessage: "All: (104-160) Reroute on J20. J5/SEA 146R ABV FL230.",
      };
    } else {
      return { SID: "SUMMA2", extendedMessage: "All: (104-160) J5/SEA 146R" };
    }
  }

  // Special case for flights on V27 since it originates at KSEA so the radial is irrelevant.
  // Otherwise look at the radial.
  // ELMAA4 CVO flight plans follow V27 so include them in this rule as well
  // (179-230) V27/J70/SEA BTW 100-FL230
  if (
    (flightPlan.routeParts.includes("V27") ||
      (flightPlan.routeParts.includes("ELMAA4") && flightPlan.routeParts.includes("CVO")) ||
      (directionOfFlight >= 179 && directionOfFlight <= 230)) &&
    flightPlan.cruiseAltitude >= 100 &&
    flightPlan.cruiseAltitude <= 230
  ) {
    return { SID: "ELMAA4", extendedMessage: "All: (179-230) V27/J70/SEA 230R BTW 100-FL230" };
  }

  // Special case for flights on J70 since it heads both east and west from KSEA.
  // (179-230) V27/J70/SEA BTW 100-FL230
  if (
    flightPlan.cruiseAltitude >= 100 &&
    flightPlan.cruiseAltitude <= 230 &&
    // Only grab flights going west, or flights that filed ELMAA4 CVO which also heads west on J70
    (directionOfFlight > 180 ||
      (flightPlan.routeParts.includes("ELMAA4") && flightPlan.routeParts.includes("CVO")))
  ) {
    return { SID: "ELMAA4", extendedMessage: "All: (179-230) V27/J70/SEA 230R BTW 100-FL230" };
  }

  // (161-230) J70/SEA 230R AoA FL230
  if (
    // Flights that filed ELMAA4 CVO are also on the J70. This only checks route parts instead of
    // direction of flight to allow other flights between 161-230 ABV FL240 to get the HAROB6.
    ((flightPlan.routeParts.includes("ELMAA4") && flightPlan.routeParts.includes("CVO")) ||
      flightPlan.routeParts.includes("J70")) &&
    flightPlan.cruiseAltitude >= 230
  ) {
    return { SID: "ELMAA4", extendedMessage: "All: (161-230) J70/SEA 230R AoA FL230" };
  }

  // (161-230) ABV FL240
  if (flightPlan.cruiseAltitude > 240 && directionOfFlight >= 161 && directionOfFlight <= 230) {
    return { SID: "HAROB6", extendedMessage: "All: (161-230) HAROB ABV FL240" };
  }

  // 231-326 ABV 100
  if (flightPlan.cruiseAltitude > 100 && directionOfFlight >= 231 && directionOfFlight <= 326) {
    return { SID: "BANGR9", extendedMessage: "All: (231-326) BANGR ABV 100" };
  }

  // (179-230) V27/J70/SEA 230R BTW 100-FL230
  if (
    flightPlan.cruiseAltitude >= 100 &&
    flightPlan.cruiseAltitude <= 230 &&
    directionOfFlight >= 179 &&
    directionOfFlight <= 230
  ) {
    return { SID: "ELMAA4", extendedMessage: "All: (179-230) V27/J70/SEA 230R BTW 100-FL230" };
  }

  // (161-230) J70/SEA 230R ABV FL230
  if (flightPlan.cruiseAltitude > 230 && directionOfFlight >= 161 && directionOfFlight <= 230) {
    return { SID: "ELMAA4", extendedMessage: "All: (161-230) J70/SEA 230R ABV FL230" };
  }

  // (231-326) J523/SEA 281R ABV 100
  if (flightPlan.cruiseAltitude > 100 && directionOfFlight >= 231 && directionOfFlight <= 326) {
    return { SID: "SEA8", extendedMessage: "All: (231-326) J523/SEA 281R ABV 100" };
  }

  // (231-326) J523/SEA 281R BLW 100
  if (flightPlan.cruiseAltitude < 100 && directionOfFlight >= 231 && directionOfFlight <= 326) {
    return { SID: "SEA8", extendedMessage: "All: (231-326) V4/V495/SEA 310R BLW 100" };
  }

  return undefined;
}

/**
 * Figures out the initial SID for a KSEA departing jet (non HDJT) aircraft.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route and reason why, or undefined if none could be deteremind
 */
export function calculateInitialSIDForJets(
  flightPlan: FlightPlan,
  directionOfFlight: number
): InitialSid {
  // (327-008) V23/RV to PAE
  if (directionOfFlight >= 327 || directionOfFlight <= 8) {
    if (flightPlan.flow === AirportFlow.South) {
      return { SID: "MONTN2", extendedMessage: "Group A: (327-008) V23/RV to PAE (South)" };
    }
    if (flightPlan.flow === AirportFlow.North) {
      return { SID: "SEA8", extendedMessage: "Group A: (327-008) V23/RV to PAE (North)" };
    }
  }

  // (009-042) J503/J505/RV to ALPSE
  if (directionOfFlight >= 9 && directionOfFlight <= 42) {
    if (flightPlan.flow === AirportFlow.South) {
      return { SID: "MONTN2", extendedMessage: "Group A: (009-042) J503/J505/RV to ALPSE (South)" };
    }
    if (flightPlan.flow === AirportFlow.North) {
      return { SID: "SEA8", extendedMessage: "Group A: (009-042) J503/J505/RV to ALPSE (North)" };
    }
  }

  // ZADON
  if (flightPlan.routeParts.includes("ZADON")) {
    return { SID: "MONTN2", extendedMessage: "Group A: ZADON" };
  }

  // (043-103) J12/J70/J90/RV to NORMY
  if (
    flightPlan.routeParts.includes("NORMY") &&
    directionOfFlight >= 43 &&
    directionOfFlight <= 103
  ) {
    return { SID: "MONTN2", extendedMessage: "Group A: (043-103) J12/J70/J90/RV to NORMY" };
  }

  // (161-178) HELENS/SEA 161R. This is a hack, it should be Group A and B but is really only testing Group A.
  // The check for cruise altitude at or below FL240 is because there's another rule later on, for all aircraft,
  // that puts anything above FL240 between 161 and 130 radials on the HAROB6.
  if (
    directionOfFlight >= 161 &&
    directionOfFlight <= 178 &&
    // HELENS or BUWZO on the route overrides the under FL240 requirement, to ensure flights to
    // Portland get the SEA8.
    (flightPlan.routeParts.includes("HELENS") ||
      flightPlan.routeParts.includes("BUWZO") ||
      flightPlan.cruiseAltitude <= 240)
  ) {
    return { SID: "SEA8", extendedMessage: "Group A, B: (161-178) HELENS/BUWZO/SEA 161R" };
  }

  // None of the jet-specific rules applied
  return undefined;
}

/**
 * Figures out the initial SID for a KSEA departing non-jet (including HDJT) aircraft.
 * @param flightPlan The flight plan
 * @returns The initial SID given the route or undefined if none could be deteremind.
 */
export function calculateInitialSIDForNotJets(
  flightPlan: FlightPlan,
  directionOfFlight: number
): InitialSid {
  // (161-178) HELENS/SEA 161R. Group B aircraft (non-jet max speed above 200).
  // The check for cruise altitude at or below FL240 is because there's another rule later on, for all aircraft,
  // that puts anything above FL240 between 161 and 130 radials on the HAROB6.
  if (
    isDocument(flightPlan.equipmentInfo) &&
    (flightPlan.equipmentInfo?.maxCruiseSpeed ?? 0) > 200 &&
    directionOfFlight >= 161 &&
    directionOfFlight <= 178 &&
    // HELENS or BUWZO on the route overrides the under FL240 requirement, to ensure flights to
    // Portland get the SEA8.
    (flightPlan.routeParts.includes("HELENS") ||
      flightPlan.routeParts.includes("BUWZO") ||
      flightPlan.cruiseAltitude <= 240)
  ) {
    return { SID: "SEA8", extendedMessage: "Group A, B: (161-178) HELENS/BUWZO/SEA 161R" };
  }

  // (327-008) V23/RV to PAE 110 & BLO
  if (flightPlan.cruiseAltitude <= 110 && (directionOfFlight >= 327 || directionOfFlight <= 8)) {
    return { SID: "MONTN2", extendedMessage: "Group B, C, D: (327-008) V23/RV to PAE 110 & BLO" };
  }

  // V23/RV to PAE 120 & ABV
  if (flightPlan.cruiseAltitude >= 120 && (directionOfFlight >= 327 || directionOfFlight <= 8)) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: (327-008) V23/RV to PAE 120 & ABV" };
  }

  // (009-040) J503/RV
  if (directionOfFlight >= 9 && directionOfFlight <= 40) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: (009-040) J503/RV" };
  }

  // (041-085) V120/J12/J70/J90/SEA 072R
  if (
    directionOfFlight >= 41 &&
    directionOfFlight <= 85
    // ||
    // _.intersection(flightPlan.routeParts, eastboundFixes).length > 0
  ) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: (041-085) V120/J12/J70/J90/SEA 072R" };
  }

  // (161-178) V495/J1/SEA 168R BTW 100-FL230
  if (
    flightPlan.cruiseAltitude >= 100 &&
    flightPlan.cruiseAltitude <= 230 &&
    directionOfFlight >= 161 &&
    directionOfFlight <= 178
  ) {
    return {
      SID: "SEA8",
      extendedMessage: "Group B, C, D: (161-178) V495/J1/SEA 168R BTW 100-FL230",
    };
  }

  // (161-178) V23/SEA 178R BLO 100
  if (flightPlan.cruiseAltitude < 100 && directionOfFlight >= 161 && directionOfFlight <= 178) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: (161-178) V23/SEA 178R BLO 100" };
  }

  // OLM.V287, OLM.V165, OLM.V187
  if (
    flightPlan.routeParts.includes("OLM") &&
    _.intersection(flightPlan.routeParts, ["V287", "V165", "V187"]).length > 0
  ) {
    return { SID: "SEA8", extendedMessage: "Group B, C, D: OLM.V287, OLM.V165, OLM.V187" };
  }

  // Issue 1145: Special case for flights heading south with OLM but not one of the above airways.
  // This happens when planes are flying KSEA KOLM and doesn't seem to really be covered in the
  // table.
  if (flightPlan.routeParts.includes("OLM")) {
    return {
      SID: "SEA8",
      extendedMessage: "Group B, C, D: Unlisted special case, OLM with no other fixes or airways?",
    };
  }

  // None of the non-jet specific rules applied
  return undefined;
}

const checkSEAInitialSID: VerifierFunction = async function (flightPlan, saveResult = true) {
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
  if (flightPlan.routeParts.length === 0) {
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
  if (flightPlan.equipmentCode == null || flightPlan.equipmentCode === "") {
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Unable to calcluate initial SID since the equipment code isn't known.`;
    result.data.messageId = "unknownEquipmentCode";
    result.data.priority = 3;
    await result.data.save();
  }

  try {
    const requiredSID = await calculateInitialSID(flightPlan);

    // This is the test the verifier is supposed to do.
    if (requiredSID == null) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.message = `Unable to find an initial SID. Either the destination airport isn't known or the route is completely wrong. Check the table in the LOA and reroute.`;
      result.data.priority = 3;
      result.data.messageId = "noSIDrule";
    } else if (requiredSID.SID !== flightPlan.SID) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.priority = 3;
      result.data.message = `Flight should be on the ${requiredSID.SID} SID.`;
      result.data.extendedMessage = [requiredSID.extendedMessage];
      result.data.messageId = "incorrectKSEASID";
    } else {
      result.data.status = VerifierResultStatus.OK;
      result.data.priority = 5;
      result.data.message = `Flight is on a SID that matches a rule for the filed route.`;
      result.data.extendedMessage = [requiredSID.extendedMessage];
      result.data.messageId = "correctKSEASID";
    }

    if (saveResult) {
      await result.data.save();
    }
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
};

export default checkSEAInitialSID;
