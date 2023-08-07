import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "vatsimflightplan" } })
export class VatsimFlightPlan {
  @prop({ required: true })
  callsign!: string;

  @prop({ required: false })
  flightRules?: string;

  @prop({ required: false })
  groundspeed?: number;

  @prop({ required: false })
  rawAircraftType?: string;

  @prop({ required: false })
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
}

const VatsimFlightPlanModel = getModelForClass(VatsimFlightPlan);

export default VatsimFlightPlanModel;
