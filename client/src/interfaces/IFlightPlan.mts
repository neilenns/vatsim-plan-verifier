import { Types } from "mongoose";
import IAircraft from "./IAircraft.mjs";
import IFlightAwareAirport from "./IFlightAwareAirport.mjs";

interface IFlightPlan {
  _id?: Types.ObjectId;
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
