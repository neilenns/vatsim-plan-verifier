import { prop, getModelForClass, modelOptions, plugin, pre } from "@typegoose/typegoose";
// @ts-ignore
import updateVersioningPlugin from "../middleware/mongoose-update-versioning/index.mjs";

export enum VatsimFlightStatus {
  UNKNOWN = "UNKNOWN",
  DEPARTING = "DEPARTING",
  ENROUTE = "ENROUTE",
  ARRIVED = "ARRIVED",
}

@modelOptions({ options: { customName: "vatsimflightplan" } })
@pre<VatsimFlightPlan>("save", function () {
  if (this.isModified()) {
    this.revision++;
  }
})
export class VatsimFlightPlan {
  @prop({ required: true })
  callsign!: string;

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
}

const VatsimFlightPlanModel = getModelForClass(VatsimFlightPlan);

export default VatsimFlightPlanModel;
