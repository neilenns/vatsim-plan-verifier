import { type Verifier } from "../../types/verifier.mjs";

import airwaysForEquipmentSuffix from "./airwaysForEquipmentSuffix.mjs";
import altitudeForAltimeter from "./altitudeForAltimeter.mjs";
import altitudeForDirectionOfFlight from "./altitudeForDirectionOfFlight.mjs";
import checkEquipmentSuffixAgainstKnown from "./checkEquipmentSuffixAgainstKnown.mjs";
import checkForCustomAirportMessages from "./checkForCustomAirportMessages.mjs";
import checkForCustomDepartureMessages from "./checkForCustomDepartureMessages.mjs";
import checkForGroundRestrictions from "./checkForGroundRestrictions.mjs";
import checkForNonStandardEquipmentSuffix from "./checkForNonStandardEquipmentSuffix.mjs";
import checkForPreferredRoutes from "./checkForPreferredRoutes.mjs";
import checkKPDXtoKSLEAltitude from "./checkKPDXtoKSLEAltitude.mjs";
import checkSEAInitialSID from "./checkSEAInitialSID.mjs";
import departureForLocalTime from "./departureForLocalTime.mjs";
import hasEquipmentSuffix from "./hasEquipmentSuffix.mjs";
import hasSID from "./hasSID.mjs";
import hasValidFirstFix from "./hasValidFirstFix.mjs";
import jetIsNotSlantA from "./jetIsNotSlantA.mjs";
import nonRNAVHasAirways from "./nonRNAVHasAirways.mjs";
import nonRVSMIsBelow290 from "./nonRVSMIsBelow290.mjs";
import pistonNotSlantLorZ from "./pistonNotSlantLorZ.mjs";
import routeWithFlightAware from "./routeWithFlightAware.mjs";
import validArrivalAirport from "./validArrivalAirport.mjs";
import validDepartureAirport from "./validDepartureAirport.mjs";
import warnHeavyRunwayAssignment from "./warnHeavyRunwayAssignment.mjs";
import warnNewPilot from "./warnNewPilot.mjs";
import warnTextOnlyPilot from "./warnTextOnlyPilot.mjs";

// List of verifiers to support
export const verifiers: Verifier[] = [
  { name: "checkForCustomAirportMessages", handler: checkForCustomAirportMessages },
  { name: "checkForCustomDepartureMessages", handler: checkForCustomDepartureMessages },
  { name: "hasEquipmentSuffix", handler: hasEquipmentSuffix },
  { name: "warnHeavyRunwayAssignment", handler: warnHeavyRunwayAssignment },
  {
    name: "altitudeForDirectionOfFlight",
    handler: altitudeForDirectionOfFlight,
  },
  {
    name: "checkEquipmentSuffixAgainstKnown",
    handler: checkEquipmentSuffixAgainstKnown,
  },
  { name: "routeWithFlightAware", handler: routeWithFlightAware },
  { name: "checkForPreferredRoutes", handler: checkForPreferredRoutes },
  { name: "nonRVSMIsBelow290", handler: nonRVSMIsBelow290 },
  { name: "jetIsNotSlantA", handler: jetIsNotSlantA },
  { name: "nonRNAVHasAirways", handler: nonRNAVHasAirways },
  { name: "validDepartureAirport", handler: validDepartureAirport },
  { name: "validArrivalAirport", handler: validArrivalAirport },
  { name: "checkForNonStandardEquipmentSuffix", handler: checkForNonStandardEquipmentSuffix },
  { name: "airwaysForEquipmentSuffix", handler: airwaysForEquipmentSuffix },
  { name: "hasSID", handler: hasSID },
  { name: "hasValidFirstFix", handler: hasValidFirstFix },
  { name: "pistonNotSlantLorZ", handler: pistonNotSlantLorZ },
  { name: "checkKPDXtoKSLEAltitude", handler: checkKPDXtoKSLEAltitude },
  { name: "warnNewPilot", handler: warnNewPilot },
  { name: "altitudeForAltimeter", handler: altitudeForAltimeter },
  { name: "warnTextOnlyPilot", handler: warnTextOnlyPilot },
  { name: "departureForLocalTime", handler: departureForLocalTime },
  { name: "checkForGroundRestrictions", handler: checkForGroundRestrictions },
  { name: "checkSEAInitialSID", handler: checkSEAInitialSID },
];
