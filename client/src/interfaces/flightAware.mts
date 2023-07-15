import { Document } from "mongoose";

export interface IFlightAwareRoute extends Document {
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

export interface IFlightAwareAirport extends Document {
  airportCode: string;
  alternateIdent: string;
  icaoCode: string;
  iataCode: string;
  lidCode: string;
  name: string;
  type: string;
  elevation: number;
  city: string;
  state: string;
  longitude: number;
  latitude: number;
  timezone: string;
  countryCode: string;
  wikiUrl: string;
  airportFlightsUrl: string;
  alternatives: string[];
}
