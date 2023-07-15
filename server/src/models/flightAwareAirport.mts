import { Schema, model } from "mongoose";
import { IFlightAwareAirport } from "../interfaces/flightAware.mjs";

const flightAwareAirportSchema = new Schema({
  airportCode: {
    type: String,
    required: true,
    unique: true,
    alias: "airport_code",
  },
  alternateIdent: {
    type: String,
    required: false,
    alias: "alternate_ident",
  },
  icaoCode: {
    type: String,
    required: false,
    alias: "code_icao",
  },
  iataCode: {
    type: String,
    required: false,
    alias: "code_iata",
  },
  lidCode: {
    type: String,
    required: false,
    alias: "code_lid",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  elevation: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
    required: false,
  },
  countryCode: {
    type: String,
    required: false,
    alias: "country_code",
  },
  wikiUrl: {
    type: String,
    required: false,
    alias: "wiki_url",
  },
  airportFlightsUrl: {
    type: String,
    required: false,
    alias: "airport_flights_url",
  },
  alternatives: {
    type: [String],
    required: false,
  },
});

const FlightAwareAirport = model<IFlightAwareAirport>(
  "FlightAwareAirport",
  flightAwareAirportSchema
);

export default FlightAwareAirport;
