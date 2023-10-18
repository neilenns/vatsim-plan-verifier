import { prop, getModelForClass, modelOptions, pre, DocumentType } from "@typegoose/typegoose";
import { parseStringToNumber, convertFLtoThousands } from "../utils.mjs";

export enum VatsimFlightStatus {
  UNKNOWN = "UNKNOWN",
  DEPARTING = "DEPARTING",
  ENROUTE = "ENROUTE",
  ARRIVED = "ARRIVED",
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

  // Sets the cruise altitude and flight rules, taking into account how vNAS flight plans
  // mark VFR flights with "VFR" in the cruise altitude field.
  public setCruiseAltitudeAndFlightRules(
    this: DocumentType<VatsimFlightPlan>,
    cruiseAltitude: string,
    flightRules: string
  ) {
    // vNAS flight plans mark VFR fligths with VFR in the cruise altitude instead of a flightRules
    // field.
    if (cruiseAltitude.startsWith("VFR")) {
      this.flightRules = "V";
    }
    // Either it's a non-vNAS flight plan or the flight is IFR
    else {
      this.flightRules = flightRules ?? "I";
    }

    // Set the cruise altitude after removing any non-digit characters (e.g. the "VFR")
    this.cruiseAltitude =
      parseStringToNumber(convertFLtoThousands(cruiseAltitude.replace(/\D/g, ""))) / 100;
  }
}

export const VatsimFlightPlanModel = getModelForClass(VatsimFlightPlan);
export type VatsimFlightPlanDocument = DocumentType<VatsimFlightPlan>;
