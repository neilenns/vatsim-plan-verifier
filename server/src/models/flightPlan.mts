import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

import IFlightPlan from "../interfaces/flightPlan.mjs";

const flightPlanSchema = new Schema<IFlightPlan>({
  callsign: { type: String, required: true },
  rawAircraftType: { type: String, required: true },
  equipmentCode: { type: String, required: false },
  isHeavy: { type: Boolean, required: false, default: false },
  equipmentSuffix: { type: String, required: false },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  squawk: { type: String, required: true },
  cruiseAltitude: { type: String, required: true },
  route: { type: String, required: true },
});

flightPlanSchema.virtual("equipmentInfo", {
  ref: "aircraft",
  localField: "equipmentCode",
  foreignField: "equipmentCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("departureAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "departure",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
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

const FlightPlan = model<IFlightPlan>("FlightPlan", flightPlanSchema);

export default FlightPlan;
