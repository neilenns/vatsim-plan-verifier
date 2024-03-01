import {
  DocumentType,
  Ref,
  getModelForClass,
  isDocument,
  modelOptions,
  plugin,
  pre,
  prop,
} from "@typegoose/typegoose";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import { Types } from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { getVatsimPilotStats } from "../controllers/vatsim.mjs";
import mainLogger from "../logger.mjs";
import { formatAltitude } from "../utils.mjs";
import { Aircraft, AircraftDocument } from "./Aircraft.mjs";
import { Airline } from "./Airline.mjs";
import { AirportInfo, AirportInfoDocument } from "./AirportInfo.mjs";
import { Departure, DepartureDocument, DepartureModel } from "./Departure.mjs";
import { AirportFlow, InitialAltitude } from "./InitialAltitude.mjs";
import { NavaidModel } from "./Navaid.mjs";
import { PilotStats } from "./PilotStats.mjs";
import { VatsimCommunicationMethod } from "./VatsimFlightPlan.mjs";
import { PromisePool } from "@supercharge/promise-pool";

const logger = mainLogger.child({ service: "flightPlan" });

const RVSMEquipmentSuffixes = ["U", "W", "Z", "L"];
const RNAVequipmentSuffixes = ["I", "Z", "G", "L"];
const GNSSEquipmentSuffixes = ["G", "L"];

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})([A-Za-z\d]+)\b/;
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
    .replace(/^\+/, "") // Strip off any + that may have been put at the front by VRC
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
        this.rawHeavyDesignator = true;
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
  } catch (err) {
    const error = err as Error;

    logger.error(`Unable to parse rawAircraftType: ${error.message}`, error);
  }

  next();
})
// Extract the airline code from the callsign.
@pre<FlightPlan>("save", function (next) {
  if (this.isModified("callsign")) {
    const regexMatch = this.callsign.match(AirlineCodeRegexPattern);

    if (regexMatch && regexMatch.length > 0) {
      this.airlineCode = regexMatch[1];
      this.flightNumber = regexMatch[2];
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
    // Strip off any + that may have been put at the front by VRC.
    const sid = extractSID(this.route?.replace(/^\+/, ""));

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
    const sid = await DepartureModel.findOne({ SID: routeParts[0] }).cacheQuery({ ttl: 60 * 60 }); // One hour
    if (sid) {
      routeParts[0] = sid.Telephony ?? routeParts[0];
    }
  }

  // Look for all of the navaids and replace them with the name of the navaid
  const { results } = await PromisePool.for(routeParts).process(async (part) => {
    if (part.length === 3) {
      const navaid = await NavaidModel.findOne({ ident: part }).cacheQuery({ ttl: 60 * 60 }); // One hour
      return navaid ? navaid.name : part;
    } else {
      return part;
    }
  });

  this.expandedRoute = results.join(" ");
})
// Cache pilot stats for later
@pre<FlightPlan>("save", async function () {
  if (!this.isModified("cid") || !this.cid) {
    return;
  }

  await getVatsimPilotStats(this.cid);
})
export class FlightPlan {
  _id!: Types.ObjectId;

  @prop({ required: false })
  cid?: number;

  @prop({ requred: false })
  pilotName?: string;

  @prop({ required: true, index: true, unique: false })
  callsign!: string;

  @prop({ required: false })
  airlineCode?: string;

  @prop({ required: false })
  flightNumber?: string;

  @prop({ required: false })
  rawAircraftType?: string;

  @prop({ required: false })
  equipmentCode?: string;

  @prop({ required: false, default: false })
  rawHeavyDesignator!: boolean;

  @prop({ required: false })
  equipmentSuffix?: string;

  @prop({ required: true, enum: AirportFlow, default: AirportFlow.Unknown })
  flow!: AirportFlow;

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

  @prop({ required: true, type: String, default: VatsimCommunicationMethod.VOICE })
  communicationMethod!: VatsimCommunicationMethod;

  // Reference properties
  @prop({
    ref: () => PilotStats,
    localField: "cid",
    foreignField: "cid",
    justOne: true,
    autopopulate: true,
  })
  pilotStats?: Ref<PilotStats>;

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

  @prop({
    ref: () => Departure,
    localField: "SID",
    foreignField: "SID",
    justOne: true,
    autopopulate: true,
  })
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
  public get heavyTelephony(): string {
    if (this.equipmentCode === "CONC") {
      return " CONCORDE";
    }

    if (this.isSuper) {
      return " SUPER";
    }

    if (this.isHeavy) {
      return " HEAVY";
    }

    return "";
  }

  // Returns the callsign for the flight as a controller would read it.
  // For example a heavy aircraft with callsign AAL212 would return
  // "AMERICAN 212 HEAVY".
  public get callsignTelephony(): string {
    if (!this.callsign) {
      return "";
    }

    if (this.telephony?.[0]) {
      return `${(this.telephony[0] as Airline).telephony} ${this.flightNumber}${
        this.heavyTelephony
      }`;
    } else {
      return `${this.callsign}${this.heavyTelephony}`;
    }
  }

  public get isHeavy(): boolean {
    return this.rawHeavyDesignator || (this.equipmentInfo as Aircraft)?.isHeavy;
  }

  public get isSuper(): boolean {
    return (this.equipmentInfo as Aircraft)?.isSuper;
  }

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

  public get initialAltitudeInfo(): InitialAltitude | null {
    const sid = this.SIDInformation as DepartureDocument | undefined;
    const departureAirportInfo = this.departureAirportInfo as AirportInfoDocument | undefined;
    const equipmentInfo = this.equipmentInfo as AircraftDocument | undefined;

    // Can't do departure initial altitude matching without equipment info and aircraft class
    if (!equipmentInfo || !equipmentInfo.aircraftClass) {
      return null;
    }

    // KPDX to KSLE has special rules handled by a verifier so don't return any initial
    // altitude info.
    if (this.departure === "KPDX" && this.arrival === "KSLE") {
      return null;
    }

    // Figure out which initial altitude info to provide.
    try {
      // An initial altitude from the Departure data takes priority over airport-wide
      // initial altitudes so try Departures first.
      // The magic sid? with the ?? [] handles the case where no sid was available for the flight plan
      // and causes the entire for loop to skip.
      const fromDeparture = InitialAltitude.findMatching(
        sid?.InitialAltitudes ?? [],
        equipmentInfo.aircraftClass,
        this.flow
      );

      if (fromDeparture) {
        return fromDeparture;
      }

      // At this point there were no matching sid initial altitudes so try airport-wide ones.
      // First see if there's any extended airport info. If not, bail.
      if (!isDocument(departureAirportInfo?.extendedAirportInfo)) {
        return null;
      }

      // Now do the same search for matching departure. This will either find something or return null.
      return InitialAltitude.findMatching(
        departureAirportInfo?.extendedAirportInfo.InitialAltitudes ?? [],
        equipmentInfo.aircraftClass,
        this.flow
      );
    } catch (err) {
      const error = err as Error;

      logger.error(`Unable to calculate initial altitude: ${error.message}`, error);
    }

    return null;
  }
}

export const FlightPlanModel = getModelForClass(FlightPlan);
export type FlightPlanDocument = DocumentType<FlightPlan>;
