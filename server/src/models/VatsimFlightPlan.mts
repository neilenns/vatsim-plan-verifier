import { prop, getModelForClass, modelOptions, plugin, pre } from "@typegoose/typegoose";
// @ts-ignore
import updateVersioningPlugin from "../middleware/mongoose-update-versioning/index.mjs";

export enum VatsimFlightStatus {
  DEPARTING = "DEPARTING",
  ENROUTE = "ENROUTE",
  ARRIVED = "ARRIVED",
}

@modelOptions({ options: { customName: "vatsimflightplan" } })
@pre<VatsimFlightPlan>("save", function () {
  if (this.isModified()) {
    this.__v = this.__v + 1;
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

  @prop({ required: true, type: String, default: VatsimFlightStatus.DEPARTING })
  status!: VatsimFlightStatus;
}

const VatsimFlightPlanModel = getModelForClass(VatsimFlightPlan);

export default VatsimFlightPlanModel;
