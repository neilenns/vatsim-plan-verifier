import { Model, Schema, model } from "mongoose";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";
import autopopulate from "mongoose-autopopulate";

export interface IFlightPlan extends IFlightPlanDocument {}
export interface FlightPlanModelInterface extends Model<IFlightPlan> {}

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})(\d+)\b/;

export const FlightPlanSchema = new Schema(
  {
    callsign: { type: String, required: true },
    airlineCode: { type: String },
    rawAircraftType: { type: String, required: true },
    equipmentCode: { type: String, required: false },
    isHeavy: { type: Boolean, required: false, default: false },
    equipmentSuffix: { type: String, required: false },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    squawk: { type: String, required: true },
    cruiseAltitude: { type: String, required: true },
    route: { type: String, required: true },
  },
  { timestamps: true }
);

FlightPlanSchema.virtual("equipmentInfo", {
  ref: "aircraft",
  localField: "equipmentCode",
  foreignField: "equipmentCode",
  justOne: true,
  autopopulate: true,
});

FlightPlanSchema.virtual("departureAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "departure",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

FlightPlanSchema.virtual("arrivalAirportInfo", {
  ref: "FlightAwareAirport",
  localField: "arrival",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

FlightPlanSchema.virtual("telephony", {
  ref: "airline",
  localField: "airlineCode",
  foreignField: "airlineCode",
  autopopulate: true,
});

// Before save split apart the rawAircraftType into the isHeavy, equipmentCode and equipmentSuffix
FlightPlanSchema.pre("save", function (next) {
  try {
    if (this.isModified("rawAircraftType")) {
      var rawAircraftType = this.rawAircraftType;

      if (rawAircraftType.startsWith("/H")) {
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
FlightPlanSchema.pre("save", function (next) {
  const regexMatch = this.callsign.match(AirlineCodeRegexPattern);

  if (regexMatch && regexMatch.length > 0) {
    this.airlineCode = regexMatch[1];
  }

  next();
});

FlightPlanSchema.plugin(autopopulate);
FlightPlanSchema.set("toJSON", { virtuals: true });

const FlightPlan: FlightPlanModelInterface = model<
  IFlightPlanDocument,
  FlightPlanModelInterface
>("FlightPlan", FlightPlanSchema);

export default FlightPlan;
