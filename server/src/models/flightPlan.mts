import { Schema, model, Document } from "mongoose";

import FlightPlan from "../interfaces/flightPlan.mjs";

const flightPlanSchema = new Schema<FlightPlan>({
  callsign: { type: String, required: true },
  aircraftType: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  squawk: { type: String, required: true },
  cruiseAltitude: { type: String, required: true },
  route: { type: String, required: true },
});

const FlightPlan = model<FlightPlan>("FlightPlan", flightPlanSchema);

export default FlightPlan;
