import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

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
}

const PreferredRouteModel = getModelForClass(PreferredRoute);

export { PreferredRoute, PreferredRouteModel };
