import IAircraft from "./IAircraft.mjs";
import IFlightAwareAirport from "./IFlightAwareAirport.mjs";
import ISIDInformation from "./ISIDInformation.mts";
import ITelephony from "./ITelephony.mts";

export enum VatsimFlightPlanStatus {
  IMPORTED = "imported",
  NEW = "new",
  UPDATED = "updated",
}

interface IFlightPlan {
  _id?: string;
  callsign?: string;
  rawAircraftType?: string;
  equipmentCode?: string;
  equipmentInfo?: IAircraft;
  departure?: string;
  arrival?: string;
  departureAirportInfo?: IFlightAwareAirport;
  arrivalAirportInfo?: IFlightAwareAirport;
  squawk?: string;
  isHeavy?: boolean;
  equipmentSuffix?: string;
  cruiseAltitude?: string;
  route?: string;
  telephony?: ITelephony[];
  expandedRoute?: string;
  initialAltitude?: string;
  SIDInformation?: ISIDInformation;
  verifierResultsCount?: number;
  remarks?: string;
  cleanedRemarks?: string;
  vatsimStatus?: VatsimFlightPlanStatus;
}

export default IFlightPlan;
