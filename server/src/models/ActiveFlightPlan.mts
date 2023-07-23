import { Schema, Types, model } from "mongoose";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";

export interface IActiveFlightPlan extends Document {
  controllerId: Types.ObjectId;
  flightPlan: IFlightPlanDocument;
  createdAt: Date;
}

const ActiveFlightPlanSchema = new Schema<IActiveFlightPlan>({
  controllerId: { type: Schema.Types.ObjectId, required: true },
  flightPlan: { type: Schema.Types.ObjectId, ref: "FlightPlan", required: true, unique: true },
  createdAt: { type: Date, expires: 60, required: true, default: Date.now },
});

// Define the mode
const ActiveFlightPlan = model("activeflightplan", ActiveFlightPlanSchema);

// Export the model
export default ActiveFlightPlan;
