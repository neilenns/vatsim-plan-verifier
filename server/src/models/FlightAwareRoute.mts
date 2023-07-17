import mongoose, { Model } from "mongoose";
import IFlightAwareRouteDocument from "../interfaces/IFlightAwareRouteDocument.mjs";
import { format } from "path";
import { formatAltitude } from "../utils.mjs";

// This method for constructing models in typescript to allow adding custom functions later is
// from https://stackoverflow.com/a/45675548/9206264.
export interface IFlightAwareRoute extends IFlightAwareRouteDocument {}
export interface FlightAwareRouteModelInterface
  extends Model<IFlightAwareRoute> {}

const flightAwareRouteSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  aircraftTypes: { type: [String], alias: "aircraft_types" },
  count: { type: Number, required: true },
  filedAltitudeMax: {
    type: Number,
    required: true,
    alias: "filed_altitude_max",
  },
  filedAltitudeMin: {
    type: Number,
    required: true,
    alias: "filed_altitude_min",
  },
  lastDepartureTime: {
    type: Date,
    required: true,
    alias: "last_departure_time",
  },
  route: { type: String, required: true },
  routeDistance: { type: String, required: true, alias: "route_distance" },
  createdAt: { type: Date, expires: "30d", required: true, default: Date.now },
});

// Formats the min and max filed altitude for the route so it displays nicely.
// If min and max are the same the result is something like "FL320".
// If min and max are different the result is something like "FL320-FL340".
// If the altitudes are below FL180 then they are shown in full thousands,
// e.g. "10,000".
flightAwareRouteSchema.virtual("filedAltitudesFormatted").get(function () {
  return this.filedAltitudeMin === this.filedAltitudeMax
    ? formatAltitude(this.filedAltitudeMin)
    : `${formatAltitude(this.filedAltitudeMin)}-${formatAltitude(
        this.filedAltitudeMax
      )}`;
});

flightAwareRouteSchema.set("toJSON", { virtuals: ["filedAltitudesFormatted"] });

const FlightAwareRoute: FlightAwareRouteModelInterface = mongoose.model<
  IFlightAwareRoute,
  FlightAwareRouteModelInterface
>("FlightAwareRoute", flightAwareRouteSchema);

export default FlightAwareRoute;
