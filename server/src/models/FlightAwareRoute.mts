import { type DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { formatAltitude } from "../utils.mjs";

@modelOptions({
  options: { customName: "flightawareroute" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
class FlightAwareRoute {
  @prop({ required: true })
  departure!: string;

  @prop({ required: true })
  arrival!: string;

  @prop({ type: [String], alias: "aircraft_types" })
  aircraftTypes?: string[];

  @prop({ required: true })
  count!: number;

  @prop({ alias: "filed_altitude_max", required: true, default: 999 })
  filedAltitudeMax!: number;

  @prop({ alias: "filed_altitude_min", required: true, default: 0 })
  filedAltitudeMin!: number;

  @prop({ alias: "last_departure_time" })
  lastDepartureTime?: Date;

  @prop()
  route?: string;

  @prop({ alias: "route_distance" })
  routeDistance?: string;

  @prop({ expires: "60d", default: Date.now })
  createdAt!: Date;

  // Formats the min and max filed altitude for the route so it displays nicely.
  // If min and max are the same the result is something like "FL320".
  // If min and max are different the result is something like "FL320-FL340".
  // If the altitudes are below FL180 then they are shown in full thousands,
  // e.g. "10,000".
  public get filedAltitudesFormatted() {
    return this.filedAltitudeMin === this.filedAltitudeMax
      ? formatAltitude(this.filedAltitudeMin ?? 0)
      : `${formatAltitude(this.filedAltitudeMin ?? 0)} to ${formatAltitude(
          this.filedAltitudeMax ?? 0
        )}`;
  }
}

export const FlightAwareRouteModel = getModelForClass(FlightAwareRoute);
export type FlightAwareRouteDocument = DocumentType<FlightAwareRoute>;
