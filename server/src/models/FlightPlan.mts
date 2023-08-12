import { Model, Schema, Types, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { formatAltitude } from "../utils.mjs";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import debug from "debug";
import { NavaidModel } from "./Navaid.mjs";
import { DepartureModel, DepartureDocument, Departure } from "./Departure.mjs";
import { Ref, isDocument, pre } from "@typegoose/typegoose";
import { AirportInfo, AirportInfoDocument } from "./AirportInfo.mjs";
import { Aircraft, AircraftDocument } from "./Aircraft.mjs";
import { prop, getModelForClass, modelOptions, DocumentType, plugin } from "@typegoose/typegoose";
import { Airline } from "./Airline.mjs";

const logger = debug("plan-verifier:flightPlan");

const RVSMEquipmentSuffixes = ["U", "W", "Z", "L"];
const RNAVequipmentSuffixes = ["I", "Z", "G", "L"];
const GNSSEquipmentSuffixes = ["G", "L"];

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})(\d+)\b/;
const SIDRegExPattern = /^([A-Za-z]{3,}\d)/;

// Non-RNAV airways start with either V or J followed by digits
const NonRNAVAirwayRegex = /^[VJ]\d+/;
const StepclimbRegex = /\S+\/[^ ]+/g;

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

function cleanRoute(route: string) {
  return route
    .replace(" DCT", "") // DCTs are never in the FlightAware returned routes
    .replace(StepclimbRegex, (match) => match.split("/")[0]) // Remove any stepclimbs
    .trim();
}

function extractSID(route: string): string | undefined {
  const regexMatch = route.match(SIDRegExPattern);

  if (regexMatch && regexMatch.length > 0) {
    return regexMatch[1];
  }

  return undefined;
}

export enum VatsimCommsEnum {
  UNKNOWN = "Unknown",
  VOICE = "Voice",
  TEXTONLY = "TextOnly",
  RECEIVEONLY = "ReceiveOnly",
}

@modelOptions({
  options: { customName: "flightplan" },
  schemaOptions: {
    collection: "flightplans",
    timestamps: true,
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(autopopulate)
// Always strip the + off the route before saving
@pre<FlightPlan>("save", function (next) {
  if (this.isModified("route")) {
    this.route = this.route?.replace(/^\+/, "");
  }
  next();
})
// Calculate directionofFlight
@pre<FlightPlan>("save", async function () {
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
})
// Extract the isHeavy, equipmentCode, and equipmentSuffix from the rawAircraftType
@pre<FlightPlan>("save", function (next) {
  try {
    if (this.isModified("rawAircraftType")) {
      let rawAircraftType = this.rawAircraftType;

      if (!rawAircraftType) {
        return next();
      }

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
})
// Extract the airline code from the callsign.
@pre<FlightPlan>("save", function (next) {
  if (this.isModified("callsign")) {
    const regexMatch = this.callsign.match(AirlineCodeRegexPattern);

    if (regexMatch && regexMatch.length > 0) {
      this.airlineCode = regexMatch[1];
    }
  }
  next();
})
// Extract the SID from the route.
@pre<FlightPlan>("save", function (next) {
  if (this.isModified("route")) {
    if (!this.route) {
      return next();
    }
    const sid = extractSID(this.route);

    if (sid) {
      this.SID = sid;
    }
  }

  next();
})
// Calculate expandedRoute
@pre<FlightPlan>("save", async function () {
  if (!this.isModified("route") || !this.route) {
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
})
export class FlightPlan {
  _id!: Types.ObjectId;

  @prop({ required: true, index: true, unique: true })
  callsign!: string;

  @prop({ required: false })
  airlineCode?: string;

  @prop({ required: false })
  rawAircraftType?: string;

  @prop({ required: false })
  equipmentCode?: string;

  @prop({ required: false, default: false })
  isHeavy!: Boolean;

  @prop({ required: false })
  equipmentSuffix?: string;

  @prop({ required: true })
  departure!: string;

  @prop({ required: true })
  arrival!: string;

  @prop({ required: true })
  squawk!: string;

  @prop({ required: true })
  cruiseAltitude!: number;

  @prop({ required: false, trim: true })
  route?: string;

  @prop({ required: false })
  directionOfFlight?: number;

  @prop({ required: false })
  SID?: string;

  @prop({ required: false })
  expandedRoute?: string;

  @prop({ required: false, trim: true })
  remarks?: string;

  // Reference properties
  @prop({
    ref: () => Aircraft,
    localField: "equipmentCode",
    foreignField: "equipmentCode",
    justOne: true,
    autopopulate: true,
  })
  equipmentInfo?: Ref<Aircraft>;

  @prop({
    ref: () => AirportInfo,
    localField: "departure",
    foreignField: "airportCode",
    justOne: true,
    autopopulate: true,
  })
  departureAirportInfo?: Ref<AirportInfo>;

  @prop({
    ref: () => AirportInfo,
    localField: "arrival",
    foreignField: "airportCode",
    justOne: true,
    autopopulate: true,
  })
  arrivalAirportInfo?: Ref<AirportInfo>;

  @prop({
    ref: () => Airline,
    localField: "airlineCode",
    foreignField: "airlineCode",
    autopopulate: true,
  })
  telephony?: Ref<Airline>[];

  @prop({ ref: () => Departure, localField: "SID", foreignField: "SID", autopopulate: true })
  SIDInformation?: Ref<Departure>;

  @prop({
    ref: () => "verifierresult",
    localField: "_id",
    foreignField: "flightPlanId",
    count: true,
    autopopulate: true,
  })
  verifierResultsCount?: number;

  // Virtual properties
  public get routeHasNonRNAVAirways(): boolean {
    return this.routeParts?.some((part: string) => NonRNAVAirwayRegex.test(part));
  }

  public get isRNAVCapable(): boolean {
    return RNAVequipmentSuffixes.includes(this.equipmentSuffix ?? "");
  }

  public get isGNSSCapable(): boolean {
    return GNSSEquipmentSuffixes.includes(this.equipmentSuffix ?? "");
  }

  public get isRVSMCapable(): boolean {
    return RVSMEquipmentSuffixes.includes(this.equipmentSuffix ?? "");
  }

  public get cruiseAltitudeFormatted(): string {
    return `${formatAltitude(this.cruiseAltitude)}`;
  }

  public get routeParts(): string[] {
    return this.route?.split(" ") ?? [];
  }

  public get vatsimComs(): VatsimCommsEnum {
    if (!this.remarks) {
      return VatsimCommsEnum.UNKNOWN;
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
  }

  public get cleanedRemarks(): string | undefined {
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
  }

  public get cleanedRoute(): string {
    if (!this.route) {
      return "";
    }

    return cleanRoute(this.route);
  }

  public get initialAltitude(): string {
    const sid = this.SIDInformation as DepartureDocument | undefined;
    const airportInfo = this.departureAirportInfo as AirportInfoDocument | undefined;
    const equipmentInfo = this.equipmentInfo as AircraftDocument | undefined;

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
  }
}

export const FlightPlanModel = getModelForClass(FlightPlan);
export type FlightPlanDocument = DocumentType<FlightPlan>;
