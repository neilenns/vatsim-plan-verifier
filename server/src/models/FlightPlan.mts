import { Model, Schema, model } from "mongoose";
import IFlightPlanDocument, { VatsimCommsEnum } from "../interfaces/IFlightPlanDocument.mjs";
import autopopulate from "mongoose-autopopulate";
import { formatAltitude } from "../utils.mjs";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import debug from "debug";
import NavaidModel from "./Navaid.mjs";
import DepartureModel, { Departure } from "./Departure.mjs";
import { IAircraft } from "./Aircraft.mjs";
import { isDocument } from "@typegoose/typegoose";
import { AirportInfoDocument } from "./AirportInfo.mjs";

const logger = debug("plan-verifier:flightPlan");
export interface IFlightPlan extends IFlightPlanDocument {}
export interface FlightPlanModelInterface extends Model<IFlightPlan> {}

const RVSMEquipmentSuffixes = ["U", "W", "Z", "L"];
const RNAVequipmentSuffixes = ["I", "Z", "G", "L"];
const GNSSEquipmentSuffixes = ["G", "L"];

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})(\d+)\b/;
const SIDRegExPattern = /^([A-Za-z]{3,}\d)/;

// Simbrief remark cleanup
const SimbriefRemarksRegExPatterns = [
  /PBN\/[A-Z0-9]+/,
  /NAV\/[A-Z0-9]+/,
  /DOF\/[A-Z0-9]+/,
  /REG\/[A-Z0-9]+/,
  /OPR\/[A-Z0-9]+/,
  /PER\/[A-Z0-9]+/,
  /DAT\/[A-Z0-9]+/,
  /CODE\/[A-Z0-9]+/,
  /ORGN\/[A-Z0-9]+/,
  /SUR\/[A-Z0-9]+/,
  /RVR\/[A-Z0-9]+/,
];
const SimbriefStepClimbRegExPattern = /[0-9]+[NS][0-9]+[EW][0-9]+/;
const SimbriefRegionRegExPattern = /[A-Z]{3,4}[0-9]{3,4}/;
const SimbriefRemoveWords = ["SIMBRIEF", "/V/", "/T/", "/R/", "RMK/TCAS", "RMK/SIMBRIEF", "RMK///"];

function extractSID(route: string): string | undefined {
  const regexMatch = route.match(SIDRegExPattern);

  if (regexMatch && regexMatch.length > 0) {
    return regexMatch[1];
  }

  return undefined;
}

export const flightPlanSchema = new Schema(
  {
    callsign: { type: String, required: true },
    airlineCode: { type: String, required: false },
    rawAircraftType: { type: String, required: false },
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
    expandedRoute: { type: String, required: false },
    remarks: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

// Non-RNAV airways start with either V or J followed by digits
const NonRNAVAirwayRegex = /^[VJ]\d+/;
const StepclimbRegex = /\S+\/[^ ]+/g;

function cleanRoute(route: string) {
  return route
    .replace(" DCT", "") // DCTs are never in the FlightAware returned routes
    .replace(StepclimbRegex, (match) => match.split("/")[0]) // Remove any stepclimbs
    .trim();
}
flightPlanSchema.virtual("routeHasNonRNAVAirways").get(function () {
  // this.get is required because routeParts is a virtual and TypeScript doesn't know it exists at this point.
  return this.get("routeParts")?.some((part: string) => NonRNAVAirwayRegex.test(part));
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

flightPlanSchema.virtual("vatsimComms").get(function () {
  if (!this.remarks) {
    return "Unknown";
  }

  const remarks = this.remarks.toUpperCase();

  if (remarks.includes("/V/")) {
    return VatsimCommsEnum.VOICE;
  } else if (remarks.includes("/R")) {
    return VatsimCommsEnum.RECEIVEONLY;
  } else if (remarks.includes("/T")) {
    return VatsimCommsEnum.TEXTONLY;
  }
  return VatsimCommsEnum.UNKNOWN;
});

flightPlanSchema.virtual("cleanedRemarks").get(function () {
  if (!this.remarks) {
    return "";
  }
  const parts = this.remarks.toUpperCase().split(" ");

  // Remove the obvious simbrief remarks, like PBN/A1B1C1D1L1O1S2 and step climbs
  const cleanedParts = parts
    .filter(
      (part: string) =>
        !SimbriefRemarksRegExPatterns.some((expression) => expression.test(part)) &&
        !SimbriefStepClimbRegExPattern.test(part) &&
        !SimbriefRegionRegExPattern.test(part) &&
        !SimbriefRemoveWords.includes(part)
    )
    .join(" ")
    .trim()
    .replace(/^\|\s+/, ""); // In case | was used as a separator between parts and got left dangling at the start

  // If no parts are left return undefined so the UI can tell and not show anything.
  if (cleanedParts === "") {
    return undefined;
  }

  return cleanedParts;
});

// Returns a route without any DCT or stepclimbs.
flightPlanSchema.virtual("cleanedRoute").get(function () {
  if (!this.route) {
    return "";
  }

  return cleanRoute(this.route);
});

flightPlanSchema.virtual("initialAltitude").get(function () {
  const sid = this.get("SIDInformation") as Departure | undefined;
  const airportInfo = this.get("departureAirportInfo") as AirportInfoDocument | undefined;
  const equipmentInfo = this.get("equipmentInfo") as IAircraft | undefined;

  // If there's no SID but there is an airport-wide initial altitude then provide that.
  if (
    !sid &&
    isDocument(airportInfo?.extendedAirportInfo) &&
    airportInfo?.extendedAirportInfo?.initialAltitude
  ) {
    return formatAltitude(airportInfo.extendedAirportInfo.initialAltitude, false);
  }

  if (!sid || !sid.InitialAltitudes || !equipmentInfo || !equipmentInfo.aircraftClass) {
    return "Unknown";
  }

  // KPDX-KSLE is a special case
  if (this.departure === "KPDX" && this.arrival === "KSLE") {
    return formatAltitude(this.cruiseAltitude < 50 ? this.cruiseAltitude : 50, false);
  }

  try {
    for (const initialAltitude of sid.InitialAltitudes) {
      const regex = new RegExp(initialAltitude.AircraftClass);
      if (regex.test(equipmentInfo.aircraftClass)) {
        return formatAltitude(initialAltitude.Altitude, false);
      }
    }
  } catch (error) {
    logger(`Unable to calculate initial altitude: ${error}`);
  }

  return "Unknown";
});

flightPlanSchema.virtual("equipmentInfo", {
  ref: "aircraft",
  localField: "equipmentCode",
  foreignField: "equipmentCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("departureAirportInfo", {
  ref: "airportinfo",
  localField: "departure",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

flightPlanSchema.virtual("arrivalAirportInfo", {
  ref: "airportinfo",
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

flightPlanSchema.virtual("verifierResultsCount", {
  ref: "verifierresult",
  localField: "_id",
  foreignField: "flightPlanId",
  count: true,
  autopopulate: true,
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

  const departureAirport = await getAirportInfo(this.departure);
  const arrivalAirport = await getAirportInfo(this.arrival);

  if (
    !departureAirport.success ||
    !arrivalAirport.success ||
    !departureAirport?.data?.latitude ||
    !departureAirport?.data?.longitude ||
    !arrivalAirport?.data?.latitude ||
    !arrivalAirport?.data?.longitude
  ) {
    return;
  }

  const origin = new LatLon(departureAirport.data.latitude, departureAirport.data.longitude);
  const destination = new LatLon(arrivalAirport.data.latitude, arrivalAirport.data.longitude);

  // Use the instance method to get the declination. This will force a call to a web service
  // to retrieve it if it's not already cached in the database.
  const magneticDeclination = await departureAirport.data.getMagneticDeclination();

  if (!magneticDeclination) {
    return;
  }

  const rawBearing = origin.initialBearingTo(destination) + (magneticDeclination ?? 0);

  // Force the final value to be between 0 and 359
  this.directionOfFlight = Math.round(rawBearing < 0 ? rawBearing + 360 : rawBearing) % 360;
});

// Before save split apart the rawAircraftType into the isHeavy, equipmentCode and equipmentSuffix
flightPlanSchema.pre("save", function (next) {
  try {
    if (this.isModified("rawAircraftType")) {
      let rawAircraftType = this.rawAircraftType;

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
    logger(`Unable to parse rawAircraftType: ${error}`);
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
    const sid = extractSID(this.route);

    if (sid) {
      this.SID = sid;
    }
  }

  next();
});

flightPlanSchema.pre("save", async function () {
  if (!this.isModified("route")) {
    return;
  }

  const routeParts = cleanRoute(this.route).split(" ");

  // See if the first route part is a known SID. If so, replace it with
  // the telephony for the SID.
  if (routeParts.length > 0) {
    const sid = await DepartureModel.findOne({ SID: routeParts[0] });
    if (sid) {
      routeParts[0] = sid.Telephony ?? routeParts[0];
    }
  }

  // Look for all of the navaids and replace them with the name of the navaid
  const expandedRouteArray = await Promise.all(
    routeParts.map(async (part) => {
      if (part.length === 3) {
        const navaid = await NavaidModel.findOne({ ident: part });
        return navaid ? navaid.name : part;
      } else {
        return part;
      }
    })
  );

  this.expandedRoute = expandedRouteArray.join(" ");
});

flightPlanSchema.plugin(autopopulate);
flightPlanSchema.set("toJSON", { virtuals: true, aliases: false });
flightPlanSchema.set("toObject", { virtuals: true, aliases: false });

const FlightPlan: FlightPlanModelInterface = model<IFlightPlanDocument, FlightPlanModelInterface>(
  "FlightPlan",
  flightPlanSchema
);

export default FlightPlan;
