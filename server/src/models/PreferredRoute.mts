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

  @prop({ type: String, required: true })
  equipmentSuffixes!: string;

  @prop({ type: String, required: true })
  engineTypes!: string;

  @prop({ type: String })
  remarks?: string;

  public static async findByFlightPlan(
    this: ReturnModelType<typeof PreferredRoute>,
    flightPlan: IFlightPlan
  ): Promise<PreferredRoute[]> {
    return this.find({
      departure: flightPlan.departure,
      arrival: flightPlan.arrival,
      equipmentSuffixes: { $regex: flightPlan.equipmentSuffix },
      engineTypes: { $regex: flightPlan.equipmentInfo?.engineType },
    });
  }
}

const PreferredRouteModel = getModelForClass(PreferredRoute);

export { PreferredRoute, PreferredRouteModel };
