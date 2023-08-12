import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { FlightPlan } from "./FlightPlan.mjs";

@modelOptions({
  options: { customName: "activeflightplan" },
  schemaOptions: {
    collection: "activeflightplans",
  },
})
export class ActiveFlightPlan {
  @prop({ required: true })
  controllerId!: mongoose.Types.ObjectId;

  @prop({ ref: () => FlightPlan, required: true, unique: true })
  flightPlan!: FlightPlan;

  @prop({ required: true, expires: "2h", default: Date.now })
  createdAt!: Date;
}

// Define the mode
export const ActiveFlightPlanModel = getModelForClass(ActiveFlightPlan);
export type ActiveFlightPlanDocument = DocumentType<ActiveFlightPlan>;
