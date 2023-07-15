import IAircraft from "./aircraft.mjs";
import { IFlightAwareAirport } from "./flightAware.mjs";

interface IFlightPlan {
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
}

export default IFlightPlan;
