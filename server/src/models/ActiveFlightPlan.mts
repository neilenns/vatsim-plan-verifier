import { type DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { FlightPlan } from "./FlightPlan.mjs";

@modelOptions({
  options: { customName: "activeflightplan" },
  schemaOptions: {
    collection: "activeflightplans",
  },
})
@plugin(SpeedGooseCacheAutoCleaner)
export class ActiveFlightPlan {
  @prop({ required: true })
  controllerId!: mongoose.Types.ObjectId;

  @prop({ required: true })
  callsign!: string;

  @prop({ ref: () => FlightPlan, required: true, unique: true })
  flightPlan!: FlightPlan;

  @prop({ required: true, expires: "2h", default: Date.now })
  createdAt!: Date;
}

// Define the mode
export const ActiveFlightPlanModel = getModelForClass(ActiveFlightPlan);
export type ActiveFlightPlanDocument = DocumentType<ActiveFlightPlan>;
