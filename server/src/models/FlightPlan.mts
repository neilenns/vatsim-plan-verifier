import { Model, Schema, model } from "mongoose";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";
import autopopulate from "mongoose-autopopulate";
import { formatAltitude } from "../utils.mjs";
import { getFlightAwareAirport } from "../controllers/flightAwareAirports.mjs";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";

export interface IFlightPlan extends IFlightPlanDocument {}
export interface FlightPlanModelInterface extends Model<IFlightPlan> {}

const RVSMEquipmentSuffixes = ["U", "W", "Z", "L"];
const RNAVequipmentSuffixes = ["I", "Z", "G", "L"];
const GNSSEquipmentSuffixes = ["G", "L"];

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})(\d+)\b/;
const SIDRegExPattern = /^([A-Za-z]{3,}\d)/;

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
    SID: { type: String, required: false },
  },
  { timestamps: true }
);

flightPlanSchema.virtual("routeHasNonRNAVAirways").get(function () {
  // this.get is required because routeParts is a virtual and TypeScript doesn't konw it exists at this point.
  return this.get("routeParts")?.some(
    (part: string) => part.startsWith("V") || part.startsWith("J")
  );
});

flightPlanSchema.virtual("isRNAVCapable").get(function () {
  return RNAVequipmentSuffixes.includes(this.equipmentSuffix ?? "");
});

flightPlanSchema.virtual("isGNSSCapable").get(function () {
  return GNSSEquipmentSuffixes.includes(this.equipmentSuffix ?? "");
});

flightPlanSchema.virtual("isRVSMCapable").get(function () {
  return RVSMEquipmentSuffixes.includes(this.equipmentSuffix ?? "");
});

flightPlanSchema.virtual("cruiseAltitudeFormatted").get(function () {
  return `${formatAltitude(this.cruiseAltitude)}`;
});

flightPlanSchema.virtual("routeParts").get(function () {
  return this.route?.split(" ") ?? [];
});

flightPlanSchema.virtual("cleanedRoute").get(function () {
  // Remove leading + that gets inserted by VRC if the route was modified
  // Remove any " DCT" that the route might have since FlightAware never includes those
  // Trim any remaining leading or trailing whitespace
  return (
    // The leading + is already removed by the pre-save hook on the route property.
    // Everything else gets cleaned up here.
    this.route
      .replace("PTLD2 ", "") // PTLD2 will never be in the FlightAware returned routes
      .replace("SEA8 ", "") // SEA8 will never be in the FlightAware returned routes
      .replace("MONTN2 ", "") // MONTN2 will never be in the FlightAware returned routes
      .replace(" DCT", "") // DCTs are never in the FlightAware returned routes
      .trim() ?? ""
  );
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

flightPlanSchema.virtual("SIDInformation", {
  ref: "departure",
  localField: "SID",
  foreignField: "SID",
  autopopulate: true,
  justOne: true,
});

// Always strip the + off the route before saving
flightPlanSchema.pre("save", function (next) {
  if (this.isModified("route")) {
    this.route = this.route?.replace(/^\+/, "");
  }
  next();
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

  const origin = new LatLon(departureAirport.data.latitude, departureAirport.data.longitude);
  const destination = new LatLon(arrivalAirport.data.latitude, arrivalAirport.data.longitude);

  var rawBearing =
    origin.initialBearingTo(destination) + (departureAirport.data.magneticDeclination ?? 0);

  // Force the final value to be between 0 and 359
  this.directionOfFlight = Math.round(rawBearing < 0 ? rawBearing + 360 : rawBearing) % 360;
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
  if (this.isModified("callsign")) {
    const regexMatch = this.callsign.match(AirlineCodeRegexPattern);

    if (regexMatch && regexMatch.length > 0) {
      this.airlineCode = regexMatch[1];
    }
  }
  next();
});

// Extract the SID from the route
flightPlanSchema.pre("save", function (next) {
  if (this.isModified("route")) {
    const regexMatch = this.route?.match(SIDRegExPattern);

    if (regexMatch && regexMatch.length > 0) {
      this.SID = regexMatch[1];
    }
  }

  next();
});

flightPlanSchema.plugin(autopopulate);
flightPlanSchema.set("toJSON", { virtuals: true, aliases: false });
flightPlanSchema.set("toObject", { virtuals: true, aliases: false });

const FlightPlan: FlightPlanModelInterface = model<IFlightPlanDocument, FlightPlanModelInterface>(
  "FlightPlan",
  flightPlanSchema
);

export default FlightPlan;
