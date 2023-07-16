import { Document } from "mongoose";

export default interface IFlightAwareRouteDocument extends Document {
  departure: string;
  arrival: string;
  aircraftTypes: string[];
  count: number;
  filedAltitudeMax: number;
  filedAltitudeMin: number;
  lastDepartureTime: Date;
  route: string;
  routeDistance: string;
  filedAltitudesFormatted: string;
}
