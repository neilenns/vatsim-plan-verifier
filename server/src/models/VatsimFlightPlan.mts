import { type DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import _ from "lodash";
import { DateTime } from "luxon";
import { ENV } from "../env.mjs";
import { type IVatsimPilot } from "../interfaces/IVatsimData.mjs";
import mainLogger from "../logger.mjs";
import { parseStringToNumber } from "../utils.mjs";
import { cleanRoute, depTimeToDateTime, getCommunicationMethod } from "../utils/vatsim.mjs";
import { AirportInfoModel } from "./AirportInfo.mjs";

const logger = mainLogger.child({ service: "vatsimFlightPlanModel" });

export enum VatsimFlightStatus {
  UNKNOWN = "UNKNOWN",
  DEPARTING = "DEPARTING",
  ENROUTE = "ENROUTE",
  ARRIVED = "ARRIVED",
}

export enum VatsimCommunicationMethod {
  VOICE = "VOICE",
  TEXTONLY = "TEXTONLY",
  RECEIVE = "RECEIVE",
}

// Issue 1132:
// This is the explicit list of properties that cause a bump in flightPlanRevision,
// which in turns causes an updated plan sound to play in the client.
const flightPlanRevisionPaths = [
  "departure",
  "arrival",
  "route",
  "cruiseAltitude",
  "rawAircraftType",
  "EDCT",
];

@modelOptions({
  options: { customName: "vatsimflightplan" },
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
class VatsimFlightPlan {
  @prop({ required: true })
  cid!: number;

  @prop({ requred: false })
  name?: string;

  @prop({ required: true })
  callsign!: string;

  @prop({ requred: true, default: false })
  isPrefile!: boolean;

  @prop({ required: false })
  flightRules?: string;

  @prop({ required: false })
  groundspeed?: number;

  @prop({ required: false })
  rawAircraftType?: string;

  @prop({ required: false, index: true, unique: false })
  departure?: string;

  @prop({ required: false })
  arrival?: string;

  @prop({ required: false })
  departureTime?: Date;

  @prop({ required: false })
  EDCT?: Date;

  @prop({ required: false })
  cruiseAltitude?: number;

  @prop({ required: false })
  route?: string;

  @prop({ required: false })
  squawk?: string;

  @prop({ required: false })
  remarks?: string;

  @prop({ required: true, type: String, default: VatsimFlightStatus.UNKNOWN })
  status!: VatsimFlightStatus;

  @prop({ required: false })
  latitude?: number;

  @prop({ required: false })
  longitude?: number;

  @prop({ required: true, type: String, default: VatsimCommunicationMethod.VOICE })
  communicationMethod!: VatsimCommunicationMethod;

  @prop()
  coastAt?: Date;

  @prop({ required: false, default: false })
  sentEDCT: boolean = false;

  // This is updated any time something changes
  @prop({ required: true, default: 0 })
  revision!: number;

  // This is the revision for the flight plan data that VATSIM provides.
  @prop({ required: false })
  vnasPlanRevision?: number;

  // This is the caluclated revision that indicates whether flight plan changes
  // happened that should be announced to the user.
  @prop({ required: true, default: 0 })
  flightPlanRevision!: number;

  public setRevision(this: VatsimFlightPlanDocument): void {
    if (!this.isModified()) {
      return;
    }

    // Something changed so bump the overall revision
    this.revision++;

    // Find all the modified paths that trigger a flightPlanRevision bump.
    const modifiedPaths = _.intersection(this.modifiedPaths(), flightPlanRevisionPaths);

    // If something changed in the properties that matter bump the flightPlanRevision.
    if (modifiedPaths.length > 0) {
      this.flightPlanRevision++;
    }
  }

  public get isCoasting(): boolean {
    return this.coastAt !== undefined;
  }

  public async updateFlightPlan(
    this: VatsimFlightPlanDocument,
    incomingPlan: IVatsimPilot
  ): Promise<void> {
    // Only try updating the flight plan properties if the revision changed on the VATSIM side.
    if (this.vnasPlanRevision !== incomingPlan.flight_plan?.revision_id) {
      this.arrival = incomingPlan.flight_plan?.arrival ?? "";
      this.departure = incomingPlan.flight_plan?.departure ?? "";
      this.departureTime = depTimeToDateTime(incomingPlan?.flight_plan?.deptime);
      this.vnasPlanRevision = incomingPlan.flight_plan?.revision_id;
      this.name = incomingPlan.flight_plan?.name ?? "";
      this.rawAircraftType = incomingPlan.flight_plan?.aircraft_faa ?? "";
      this.remarks = incomingPlan.flight_plan?.remarks ?? "";
      this.route = cleanRoute(incomingPlan.flight_plan?.route ?? "");
      this.squawk = incomingPlan.flight_plan?.assigned_transponder ?? "";
    }

    this.isPrefile = incomingPlan.isPrefile;
    this.coastAt = undefined; // Handles planes that reconnect after briefly disconnecting

    // Set the special properties that need calculations
    this.communicationMethod = getCommunicationMethod(this.remarks);
    this.setCruiseAltitudeAndFlightRules(
      incomingPlan.flight_plan?.altitude,
      incomingPlan.flight_plan?.flight_rules
    );

    // Set the special properties that only apply to real plans (not prefiles)
    if (!this.isPrefile) {
      this.updateNoisyProperties(incomingPlan);
      await this.updateFlightStatus().then(() => {
        // Calculate the revision last
        this.setRevision();
      });
    }
    // Don't forget to set the revision on prefiles
    else {
      this.setRevision();
    }
  }

  public setCoast(this: VatsimFlightPlanDocument): void {
    const now = DateTime.utc();

    // If it's not coasting yet give it a coasting time.
    if (this.coastAt == null) {
      this.coastAt = now.toJSDate();
      return;
    }

    // Check and see how long the plane's been coasting. If it's longer than the threshold
    // then set its coastAt to undefined and it will wind up getting marked as not coasting
    // anymore and deleted. Otherwise do nothing (it's still coasting).
    const coastDiff = now.diff(DateTime.fromJSDate(this.coastAt), "minutes").minutes;
    if (coastDiff > ENV.COAST_TIME_MINUTES) {
      this.coastAt = undefined;
    }
  }

  // Some properties change a *lot* and cause a ton of database updates. Instead of updating them
  // every time only update them if the value changed a bit.
  public updateNoisyProperties(this: VatsimFlightPlanDocument, incomingPlan: IVatsimPilot): void {
    let delta: number;

    // Groundspeed
    delta = Math.abs((incomingPlan?.groundspeed ?? 0) - (this?.groundspeed ?? 0));
    if (delta > ENV.UPDATE_DELTA_GROUND_SPEED) {
      this.groundspeed = incomingPlan.groundspeed;
    }

    // Latitude
    delta = Math.abs((incomingPlan?.latitude ?? 0) - (this?.latitude ?? 0));
    if (delta > ENV.UPDATE_DELTA_LATITUDE) {
      this.latitude = incomingPlan.latitude;
    }

    // Longitude
    delta = Math.abs((incomingPlan?.longitude ?? 0) - (this?.longitude ?? 0));
    if (delta > ENV.UPDATE_DELTA_LONGITUDE) {
      this.longitude = incomingPlan.longitude;
    }
  }

  /**
   * Determines a plane's flight state based on its location and ground speed. Anything over VATSIM_GROUNDSPEED_CUTOFF
   * is considered ENROUTE. Anything slower than that within 3nm of the departure airport is considered DEPARTING.
   * Anything slower than that within 3nm of the arrival airport is considered ARRIVING.
   * @param flightPlan The flight plan.
   * @returns The plane's flight state.
   */
  public async updateFlightStatus(): Promise<void> {
    // All prefiles, planes without a departure airport, planes without a lat/long, and planes with no ground speed are assumed to be departing.
    if (
      this.isPrefile ||
      this.departure == null ||
      this.latitude == null ||
      this.longitude == null ||
      this.groundspeed === undefined
    ) {
      this.status = VatsimFlightStatus.DEPARTING;
      return;
    }

    // Anything going faster than the groundspeed cutoff is considered enroute.
    if (this.groundspeed > ENV.VATSIM_GROUNDSPEED_CUTOFF) {
      this.status = VatsimFlightStatus.ENROUTE;
      return;
    }

    // Checking distance to the departure airport and arrival airport is done separately with
    // a test for distance cutoff to avoid calculating the distance to the arrival airport
    // unnecessarily. There are far more aircraft on vatsim in the deprating state than the arriving
    // state so this cuts down on database calls quite a bit.

    // Check and see if the plane is within the required distance of the departure airport.
    const distanceFromDepartureAirport = await AirportInfoModel.distanceTo(
      this.departure,
      this.latitude,
      this.longitude
    );

    if (
      distanceFromDepartureAirport != null &&
      distanceFromDepartureAirport < ENV.VATSIM_DISTANCE_CUTOFF_IN_KM
    ) {
      this.status = VatsimFlightStatus.DEPARTING;
      return;
    }

    // Check and see if the plane is within the required distance of the arrival airport.
    const distanceFromArrivalAirport = await AirportInfoModel.distanceTo(
      this.arrival,
      this.latitude,
      this.longitude
    );

    if (
      distanceFromArrivalAirport != null &&
      distanceFromArrivalAirport < ENV.VATSIM_DISTANCE_CUTOFF_IN_KM
    ) {
      this.status = VatsimFlightStatus.ARRIVED;
      return;
    }

    // There's an edge case where planes are going slower than the groundspeed cutoff but
    // their distance from either departure or arrival airport is above the cutoff distance.
    // in that case check the distances and set the DEPARTING or ARRIVING state based on
    // which airport is closer.
    if (distanceFromArrivalAirport != null && distanceFromDepartureAirport != null) {
      distanceFromArrivalAirport < distanceFromDepartureAirport
        ? (this.status = VatsimFlightStatus.ARRIVED)
        : (this.status = VatsimFlightStatus.DEPARTING);
      return;
    }

    // This will happen if the airport distances couldn't be calculated for some reason, e.g. there's no
    // information available for the departure or arrival airport, or they were lower than
    // ground
    logger.debug(`Unable to set flight status for ${this.callsign}`, { flightPlan: this });
    this.status = VatsimFlightStatus.UNKNOWN;
  }

  // Sets the cruise altitude and flight rules, taking into account how vNAS flight plans
  // mark VFR flights with "VFR" in the cruise altitude field.
  public setCruiseAltitudeAndFlightRules(
    this: DocumentType<VatsimFlightPlan>,
    cruiseAltitude: string,
    flightRules: string
  ): void {
    // Handle the case of the incoming cruise altitude being undefined or empty from
    // an incoming vatsim flight plan.
    const rawAltitude = cruiseAltitude ?? "0";
    let altitude;

    // vNAS flight plans mark VFR fligths with VFR in the cruise altitude instead of a flightRules
    // field. It is either "VFR040" or just "VFR". If it is a VFR flight, mark the flight rule
    // accordingly,t hen convert the altitude to a string that is can be used later.
    if (rawAltitude.startsWith("VFR")) {
      this.flightRules = "V";
      altitude = `${rawAltitude.replace(/^VFR/, "")}00`;
    }
    // Either it's a non-vNAS flight plan or the flight is IFR
    else {
      this.flightRules = flightRules;

      // Check and see if it is an old-style altitude. If so, strip the FL and add two zeros.
      if (rawAltitude.startsWith("FL")) {
        altitude = `${rawAltitude.replace(/^FL/, "")}00`;
      } else {
        altitude = rawAltitude;
      }
    }

    // Parse the received altitude to a number, then divide by 100 since everything else expects
    // it that way.
    this.cruiseAltitude = parseStringToNumber(altitude) / 100;
  }
}

export const VatsimFlightPlanModel = getModelForClass(VatsimFlightPlan);
export type VatsimFlightPlanDocument = DocumentType<VatsimFlightPlan>;
