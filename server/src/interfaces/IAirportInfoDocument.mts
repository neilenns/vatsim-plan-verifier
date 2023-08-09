import { Document } from "mongoose";
import { ExtendedAirportInfo } from "../models/ExtendedAirportInfo.mjs";

export default interface IAirportInfoDocument extends Document {
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
  magneticDeclination?: number;
  extendedAirportInfo?: ExtendedAirportInfo;
}
