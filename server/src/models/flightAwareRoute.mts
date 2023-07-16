import mongoose, { Model } from "mongoose";
import IFlightAwareRouteDocument from "../interfaces/IFlightAwareRouteDocument.mjs";

// This method for constructing models in typescript to allow adding custom functions later is
// from https://stackoverflow.com/a/45675548/9206264.
export interface IFlightAwareRoute extends IFlightAwareRouteDocument {}
export interface FlightAwareRouteModelInterface
  extends Model<IFlightAwareRoute> {}

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

const FlightAwareRoute: FlightAwareRouteModelInterface = mongoose.model<
  IFlightAwareRoute,
  FlightAwareRouteModelInterface
>("FlightAwareRoute", flightAwareRouteSchema);

export default FlightAwareRoute;
