import { AircraftDocument } from "../models/Aircraft.mjs";
import { AirportInfoDocument } from "../models/AirportInfo.mjs";
import { Departure } from "../models/Departure.mjs";
import { Document } from "mongoose";

export enum VatsimCommsEnum {
  UNKNOWN = "Unknown",
  VOICE = "Voice",
  TEXTONLY = "TextOnly",
  RECEIVEONLY = "ReceiveOnly",
}

export default interface IFlightPlanDocument extends Document {
  callsign: string;
  airlineCode?: string;
  telephony?: string[];
  rawAircraftType: string;
  equipmentCode?: string;
  equipmentInfo?: AircraftDocument;
  departure: string;
  arrival: string;
  departureAirportInfo?: AirportInfoDocument;
  arrivalAirportInfo?: AirportInfoDocument;
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
  SID?: string;
  SIDInformation?: Departure;
  expandedRoute?: string;
  initialAltitude?: string;
  remarks?: string;
  cleanedRemarks?: string;
  vatsimComms?: VatsimCommsEnum;
}
