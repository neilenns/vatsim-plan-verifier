import IAircraftDocument from "./IAircraftDocument.mjs";
import IFlightAwareAirportDocument from "./IFlightAwareAirportDocument.mjs";
import { Document } from "mongoose";

export default interface IFlightPlanDocument extends Document {
  callsign: string;
  airlineCode?: string;
  telephony?: string[];
  rawAircraftType: string;
  equipmentCode?: string;
  equipmentInfo?: IAircraftDocument;
  departure: string;
  arrival: string;
  departureAirportInfo?: IFlightAwareAirportDocument;
  arrivalAirportInfo?: IFlightAwareAirportDocument;
  squawk: string;
  isHeavy?: boolean;
  equipmentSuffix?: string;
  cruiseAltitude: number;
  cruiseAltitudeFormatted: string;
  route?: string;
  directionOfFlight?: number;
  routeParts?: string[];
  cleanedRoute?: string;
  isRVSMCapable: boolean;
  isRNAVCapable: boolean;
  isGNSSCapable: boolean;
  routeHasNonRNAVAirways: boolean;
}
