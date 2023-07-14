import mongoose from "mongoose";
import { IFlightAwareAirport } from "../interfaces/flightAware.mjs";

const flightAwareAirportSchema = new mongoose.Schema({
  airportCode: {
    type: String,
    required: true,
    unique: true,
  },
  alternateIdent: {
    type: String,
    required: false,
  },
  icaoCode: {
    type: String,
    required: false,
  },
  iataCode: {
    type: String,
    required: false,
  },
  lidCode: {
    type: String,
    required: false,
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
  },
  wikiUrl: {
    type: String,
    required: false,
  },
  airportFlightsUrl: {
    type: String,
    required: false,
  },
  alternatives: {
    type: [String],
    required: false,
  },
});

const FlightAwareAirport = mongoose.model<IFlightAwareAirport>(
  "FlightAwareAirport",
  flightAwareAirportSchema
);

export default FlightAwareAirport;
