import { Document, Types } from "mongoose";

export type StatusValue = "Ok" | "Information" | "Warning" | "Error";
export type PriorityValue = 1 | 2 | 3 | 4 | 5;
export type FlightPlanPartValue =
  | "callsign"
  | "rawAircraftType"
  | "equipmentCode"
  | "departure"
  | "arrival"
  | "squawk"
  | "cruiseAltitude"
  | "route";

export default interface IVerifierResultDocument extends Document {
  flightPlanId: Types.ObjectId;
  status: StatusValue;
  verifier: string;
  messageId: string;
  message: string;
  extendedMessage?: string[];
  flightPlanPart: FlightPlanPartValue;
  priority: PriorityValue;
}
