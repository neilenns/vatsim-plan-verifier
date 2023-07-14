import mongoose from "mongoose";
import { IFlightAwareRoute } from "../interfaces/flightAware.mjs";

const flightAwareRouteSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
  aircraft_types: [String],
  count: Number,
  filed_altitude_max: Number,
  filed_altitude_min: Number,
  last_departure_time: String,
  route: String,
  route_distance: String,
  FiledAltitudesFormatted: String,
  createdAt: { type: Date, expires: "30d", default: Date.now },
});

const FlightAwareRoute = mongoose.model<IFlightAwareRoute>(
  "FlightAwareRoute",
  flightAwareRouteSchema
);

export default FlightAwareRoute;
