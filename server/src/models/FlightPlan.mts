import mongoose, { Model, Schema, model } from "mongoose";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";
import autopopulate from "mongoose-autopopulate";
import { formatAltitude } from "../utils.mjs";
import { getFlightAwareAirport } from "../controllers/flightAwareAirports.mjs";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import { getMagneticDeclination } from "../controllers/magneticDeclination.mjs";

export interface IFlightPlan extends IFlightPlanDocument {}
export interface FlightPlanModelInterface extends Model<IFlightPlan> {}

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})(\d+)\b/;

export const flightPlanSchema = new Schema(
  {
    callsign: { type: String, required: true },
    airlineCode: { type: String, required: false },
    rawAircraftType: { type: String, required: true },
    equipmentCode: { type: String, required: false },
    isHeavy: { type: Boolean, required: false, default: false },
    equipmentSuffix: { type: String, required: false },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    squawk: { type: String, required: true },
    cruiseAltitude: { type: Number, required: true },
    route: { type: String, required: false, trim: true },
    directionOfFlight: { type: Number, required: false },
  },
  { timestamps: true }
);

flightPlanSchema.virtual("cruiseAltitudeFormatted").get(function () {
  return `${formatAltitude(this.cruiseAltitude)}`;
});

flightPlanSchema.virtual("routeParts").get(function () {
  return this.route?.split(" ") ?? [];
});

flightPlanSchema.virtual("equipmentInfo", {
  ref: "aircraft",
  localField: "equipmentCode",
  foreignField: "equipmentCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("departureAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "departure",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("arrivalAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "arrival",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("telephony", {
  ref: "airline",
  localField: "airlineCode",
  foreignField: "airlineCode",
  autopopulate: true,
});

// Calculate the direction of flight and store it
flightPlanSchema.pre("save", async function () {
  // Only recalculate the direction of flight if the departure or arrival airport has changed
  if (!this.isModified("departure") && !this.isModified("arrival")) {
    return;
  }

  const departureAirport = await getFlightAwareAirport(this.departure);
  const arrivalAirport = await getFlightAwareAirport(this.arrival);

  if (!departureAirport.success || !arrivalAirport.success) {
    return;
  }

  const origin = new LatLon(
    departureAirport.data.latitude,
    departureAirport.data.longitude
  );
  const destination = new LatLon(
    arrivalAirport.data.latitude,
    arrivalAirport.data.longitude
  );

  var rawBearing =
    origin.initialBearingTo(destination) +
    (departureAirport.data.magneticDeclination ?? 0);

  // Force the final value to be between 0 and 359
  this.directionOfFlight =
    (rawBearing < 0 ? rawBearing + 360 : rawBearing) % 360;
});

// Before save split apart the rawAircraftType into the isHeavy, equipmentCode and equipmentSuffix
flightPlanSchema.pre("save", function (next) {
  try {
    if (this.isModified("rawAircraftType")) {
      var rawAircraftType = this.rawAircraftType;

      if (rawAircraftType.startsWith("H/")) {
        this.isHeavy = true;
        rawAircraftType = rawAircraftType.substring(2); // Strip off the leading "H/"
      }

      const codeMatch = rawAircraftType.match(/^([A-Z0-9]+)(\/([A-Z]))?$/);
      if (codeMatch && codeMatch.length > 0) {
        this.equipmentCode = codeMatch[1];
        if (codeMatch.length > 2 && codeMatch[3]) {
          this.equipmentSuffix = codeMatch[3];
        }
      }
    }
  } catch (error) {
    console.error(`Unable to parse rawAircraftType: ${error}`);
  }

  next();
});

// Extract the airline code from the callsign.
flightPlanSchema.pre("save", function (next) {
  const regexMatch = this.callsign.match(AirlineCodeRegexPattern);

  if (regexMatch && regexMatch.length > 0) {
    this.airlineCode = regexMatch[1];
  }

  next();
});

flightPlanSchema.plugin(autopopulate);
flightPlanSchema.set("toJSON", { virtuals: true, aliases: false });

const FlightPlan: FlightPlanModelInterface = model<
  IFlightPlanDocument,
  FlightPlanModelInterface
>("FlightPlan", flightPlanSchema);

export default FlightPlan;
