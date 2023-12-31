import { Types } from "mongoose";

export default interface IFlightAwareRoute {
  _id?: Types.ObjectId;
  departure: string;
  arrival: string;
  aircraft_types: string[];
  count: number;
  filed_altitude_max: number;
  filed_altitude_min: number;
  last_departure_time: string;
  route: string;
  route_distance: string;
  FiledAltitudesFormatted: string;
}
