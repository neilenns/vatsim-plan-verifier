import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { IFlightPlan } from "./FlightPlan.mjs";

class PreferredRoute {
  @prop({ required: true })
  departure!: string;

  @prop({ required: true })
  arrival!: string;

  @prop({ required: true })
  route!: string;

  @prop({ required: true })
  minimumRequiredAltitude!: number;

  @prop({ required: true })
  minimumRequiredSpeed!: number;

  @prop({ type: String, required: true, default: [] })
  equipmentSuffixes!: Types.Array<string>;

  @prop({ type: String, required: true, default: [] })
  engineTypes!: Types.Array<string>;

  public static async findByFlightPlan(
    this: ReturnModelType<typeof PreferredRoute>,
    flightPlan: IFlightPlan
  ): Promise<PreferredRoute[]> {
    return this.find({
      departure: flightPlan.departure,
      arrival: flightPlan.arrival,
      equipmentSuffixes: { $in: flightPlan.equipmentSuffix },
      engineTypes: { $in: flightPlan.equipmentInfo?.engineType },
    });
  }
}

const PreferredRouteModel = getModelForClass(PreferredRoute);

export { PreferredRoute, PreferredRouteModel };
