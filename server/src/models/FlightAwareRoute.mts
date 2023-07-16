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
  aircraftTypes: { type: [String], alias: "aircraft_types" },
  count: Number,
  filedAltitudeMax: { type: Number, alias: "filed_altitude_max" },
  filedAltitudeMin: { type: Number, alias: "filed_altitude_min" },
  lastDepartureTime: { type: Date, alias: "last_departure_time" },
  route: String,
  routeDistance: { type: String, alias: "route_distance" },
  filedAltitudesFormatted: String,
  createdAt: { type: Date, expires: "30d", default: Date.now },
});

const FlightAwareRoute: FlightAwareRouteModelInterface = mongoose.model<
  IFlightAwareRoute,
  FlightAwareRouteModelInterface
>("FlightAwareRoute", flightAwareRouteSchema);

export default FlightAwareRoute;
