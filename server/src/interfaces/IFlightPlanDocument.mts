import IAircraft from "./aircraft.mjs";
import { IFlightAwareAirport } from "./flightAware.mjs";
import { Document } from "mongoose";

interface IFlightPlanDocument extends Document {
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

export default IFlightPlanDocument;
