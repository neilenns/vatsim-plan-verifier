import { type VerifierResultDocument } from "../models/VerifierResult.mjs";

export default interface IVerifyAllResult {
  results: VerifierResultDocument[];
  hasErrors: boolean;
  hasWarnings: boolean;
  hasRawAircraftTypeWarnings: boolean;
  hasRawAircraftTypeErrors: boolean;
  hasCallsignWarnings: boolean;
  hasCallsignErrors: boolean;
  hasEquipmentCodeWarnings: boolean;
  hasEquipmentCodeErrors: boolean;
  hasDepartureWarnings: boolean;
  hasDepartureErrors: boolean;
  hasArrivalWarnings: boolean;
  hasArrivalErrors: boolean;
  hasSquawkWarnings: boolean;
  hasSquawkErrors: boolean;
  hasCruiseAltitudeWarnings: boolean;
  hasCruiseAltitudeErrors: boolean;
  hasRouteWarnings: boolean;
  hasRouteErrors: boolean;
  errorCount: number;
  warningCount: number;
  callsignErrorCount: number;
  callsignWarningCount: number;
  rawAircraftTypeErrorCount: number;
  rawAircraftTypeWarningCount: number;
  equipmentCodeErrorCount: number;
  equipmentCodeWarningCount: number;
  departureErrorCount: number;
  departureWarningCount: number;
  arrivalErrorCount: number;
  arrivalWarningCount: number;
  squawkErrorCount: number;
  squawkWarningCount: number;
  cruiseAltitudeErrorCount: number;
  cruiseAltitudeWarningCount: number;
  routeErrorCount: number;
  routeWarningCount: number;
}
