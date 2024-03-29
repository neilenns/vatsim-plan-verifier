import IAircraft from "./IAircraft.mjs";
import AirportInfo from "./IAirportInfo.mjs";
import { IPilotStats } from "./IPilotStats.mts";
import { AirportFlow, IInitialAltitude, ISIDInformation } from "./ISIDInformation.mts";
import ITelephony from "./ITelephony.mts";

interface IFlightPlan {
  _id?: string;
  cid?: number;
  pilotName?: string;
  callsign?: string;
  callsignTelephony?: string;
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
  isSuper?: boolean;
  equipmentSuffix?: string;
  cruiseAltitude?: string;
  flow?: AirportFlow;
  route?: string;
  telephony?: ITelephony[];
  expandedRoute?: string;
  initialAltitudeInfo?: IInitialAltitude;
  SIDInformation?: ISIDInformation;
  verifierResultsCount?: number;
  remarks?: string;
  cleanedRemarks?: string;
  pilotStats?: IPilotStats;
  communicationMethod?: string;
}

export default IFlightPlan;
