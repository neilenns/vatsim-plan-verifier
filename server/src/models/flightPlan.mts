import { Schema, model, Document } from "mongoose";

export interface IFlightPlan extends Document {
  callsign: string;
  aircraftType: string;
  departure: string;
  arrival: string;
  squawk: string;
  cruiseAltitude: string;
  route: string;
}

const flightPlanSchema = new Schema<IFlightPlan>({
  callsign: { type: String, required: true },
  aircraftType: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  squawk: { type: String, required: true },
  cruiseAltitude: { type: String, required: true },
  route: { type: String, required: true },
});

const FlightPlan = model<IFlightPlan>("FlightPlan", flightPlanSchema);

export default FlightPlan;
