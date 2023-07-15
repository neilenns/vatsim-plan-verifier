import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

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

flightPlanSchema.virtual("departureAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "departure",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("arrivalAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "arrival",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.plugin(autopopulate);
flightPlanSchema.set("toJSON", { virtuals: true });

const FlightPlan = model<FlightPlan>("FlightPlan", flightPlanSchema);

export default FlightPlan;
