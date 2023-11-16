import { prop, getModelForClass, modelOptions, pre, DocumentType } from "@typegoose/typegoose";
import { parseStringToNumber, convertFLtoThousands } from "../utils.mjs";

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

@modelOptions({ options: { customName: "vatsimflightplan" } })
@pre<VatsimFlightPlan>("save", function (this: DocumentType<VatsimFlightPlan>) {
  if (this.isModified()) {
    this.revision++;
  }
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
  cruiseAltitude?: number;

  @prop({ required: false })
  route?: string;

  @prop({ required: false })
  squawk?: string;

  @prop({ required: false })
  remarks?: string;

  @prop({ required: true, type: String, default: VatsimFlightStatus.UNKNOWN })
  status!: VatsimFlightStatus;

  @prop({ required: true, default: 0 })
  revision!: number;

  @prop({ required: false })
  latitude?: number;

  @prop({ required: false })
  longitude?: number;

  @prop({ required: true, type: String, default: VatsimCommunicationMethod.VOICE })
  communicationMethod!: VatsimCommunicationMethod;

  // Sets the cruise altitude and flight rules, taking into account how vNAS flight plans
  // mark VFR flights with "VFR" in the cruise altitude field.
  public setCruiseAltitudeAndFlightRules(
    this: DocumentType<VatsimFlightPlan>,
    cruiseAltitude: string,
    flightRules: string
  ) {
    // Handle the case of the incoming cruise altitude being undefined or empty from
    // an incoming vatsim flight plan.
    const rawAltitude = cruiseAltitude ?? "0";
    var altitude;

    // vNAS flight plans mark VFR fligths with VFR in the cruise altitude instead of a flightRules
    // field. It is either "VFR040" or just "VFR". If it is a VFR flight, mark the flight rule
    // accordingly,t hen convert the altitude to a string that is can be used later.
    if (rawAltitude.startsWith("VFR")) {
      this.flightRules = "V";
      altitude = `${rawAltitude.replace(/^VFR/, "")}00`;
    }
    // Either it's a non-vNAS flight plan or the flight is IFR
    else {
      this.flightRules = flightRules ?? "I";

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
