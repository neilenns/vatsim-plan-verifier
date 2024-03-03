import { type DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

export enum VerifierResultStatus {
  OK = "Ok",
  INFORMATION = "Information",
  WARNING = "Warning",
  ERROR = "Error",
  CUSTOMMESSAGE = "CustomMessage",
}

export enum VerifierResultFlightPlanPart {
  CALLSIGN = "callsign",
  RAWAIRCRAFTTYPE = "rawAircraftType",
  EQUIPMENTCODE = "equipmentCode",
  DEPARTURE = "departure",
  ARRIVAL = "arrival",
  SQUAWK = "squawk",
  CRUISEALTITUDE = "cruiseAltitude",
  ROUTE = "route",
}

@modelOptions({
  options: { customName: "verifierresult" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(SpeedGooseCacheAutoCleaner)
export class VerifierResult {
  @prop({ required: true })
  flightPlanId!: mongoose.Types.ObjectId;

  @prop({ required: true, enum: VerifierResultStatus })
  status!: VerifierResultStatus;

  @prop({ required: true })
  verifier!: string;

  @prop({ required: true })
  message!: string;

  @prop({ required: true, default: "Unknown" })
  messageId!: string;

  @prop({ type: () => [String] })
  extendedMessage?: string[];

  @prop({ required: true, enum: VerifierResultFlightPlanPart })
  flightPlanPart!: VerifierResultFlightPlanPart;

  @prop({ required: true, enum: [1, 2, 3, 4, 5] })
  priority!: number;

  @prop({ required: true, expires: "1w", default: Date.now })
  createdAt!: Date;
}

// Define the model
export const VerifierResultModel = getModelForClass(VerifierResult);
export type VerifierResultDocument = DocumentType<VerifierResult>;
