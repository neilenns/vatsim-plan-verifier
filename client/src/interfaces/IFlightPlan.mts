import IAircraft from "./IAircraft.mjs";
import IFlightAwareAirport from "./IFlightAwareAirport.mjs";
import ITelephony from "./ITelephony.mts";

interface IFlightPlan {
  _id?: string;
  callsign: string;
  rawAircraftType: string;
  equipmentCode?: string;
  equipmentInfo?: IAircraft;
  departure: string;
  arrival: string;
  departureAirportInfo?: IFlightAwareAirport;
  arrivalAirportInfo?: IFlightAwareAirport;
  squawk: string;
  isHeavy?: boolean;
  equipmentSuffix?: string;
  cruiseAltitude: string;
  route: string;
  telephony?: ITelephony[];
  expandedRoute?: string;
  initialAltitude?: string;
}

export default IFlightPlan;
