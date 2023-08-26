import IAircraft from "./IAircraft.mjs";
import AirportInfo from "./IAirportInfo.mjs";
import { IPilotStats } from "./IPilotStats.mts";
import ISIDInformation from "./ISIDInformation.mts";
import ITelephony from "./ITelephony.mts";

interface IFlightPlan {
  _id?: string;
  cid?: number;
  pilotName?: string;
  callsign?: string;
  flightNumber?: string;
  rawAircraftType?: string;
  equipmentCode?: string;
  equipmentInfo?: IAircraft;
  departure?: string;
  arrival?: string;
  departureAirportInfo?: AirportInfo;
  arrivalAirportInfo?: AirportInfo;
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
  pilotStats?: IPilotStats;
}

export default IFlightPlan;
