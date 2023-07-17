import { Document, Types } from "mongoose";

export type StatusValue = "Ok" | "Warning" | "Error";
export type PriorityValue = 1 | 2 | 3 | 4 | 5;
export type FlightPlanPartValue =
  | "callsign"
  | "rawAircraftType"
  | "equipmentCode"
  | "departure"
  | "arrival"
  | "squawk"
  | "isHeavy"
  | "cruiseAltitude"
  | "route";

export default interface IVerifierResultDocument extends Document {
  flightPlanId: Types.ObjectId;
  status: StatusValue;
  verifier: string;
  message: string;
  extendedMessage?: string[];
  flightPlanPart: FlightPlanPartValue;
  priority: PriorityValue;
}
