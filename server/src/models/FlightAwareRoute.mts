import { DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { formatAltitude } from "../utils.mjs";

@modelOptions({
  options: { customName: "flightawareroute" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(SpeedGooseCacheAutoCleaner)
class FlightAwareRoute {
  @prop({ required: true })
  departure!: string;

  @prop({ required: true })
  arrival!: string;

  @prop({ required: true, type: [String], alias: "aircraft_types" })
  aircraftTypes!: string[];

  @prop({ required: true })
  count!: number;

  @prop({ required: true, alias: "filed_altitude_max" })
  filedAltitudeMax!: number;

  @prop({ required: true, alias: "filed_altitude_min" })
  filedAltitudeMin!: number;

  @prop({ required: true, alias: "last_departure_time" })
  lastDepartureTime!: Date;

  @prop({ required: true })
  route!: string;

  @prop({ required: true, alias: "route_distance" })
  routeDistance!: string;

  @prop({ required: true, expires: "60d", default: Date.now })
  createdAt!: Date;

  // Formats the min and max filed altitude for the route so it displays nicely.
  // If min and max are the same the result is something like "FL320".
  // If min and max are different the result is something like "FL320-FL340".
  // If the altitudes are below FL180 then they are shown in full thousands,
  // e.g. "10,000".
  public get filedAltitudesFormatted() {
    return this.filedAltitudeMin === this.filedAltitudeMax
      ? formatAltitude(this.filedAltitudeMin)
      : `${formatAltitude(this.filedAltitudeMin)} to ${formatAltitude(this.filedAltitudeMax)}`;
  }
}

export const FlightAwareRouteModel = getModelForClass(FlightAwareRoute);
export type FlightAwareRouteDocument = DocumentType<FlightAwareRoute>;
