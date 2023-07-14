import { Types } from "mongoose";

export default interface IFlightPlan {
  callsign: string;
  aircraftType: string;
  departure: string;
  arrival: string;
  squawk: string;
  cruiseAltitude: string;
  route: string;
  _id: Types.ObjectId;
}
