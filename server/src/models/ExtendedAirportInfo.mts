import { prop, getModelForClass, modelOptions, ReturnModelType } from "@typegoose/typegoose";
import { InitialPhrasingOptions } from "./Departure.mjs";

@modelOptions({
  options: { customName: "extendedairportinfo" },
  schemaOptions: { collection: "extendedairportinfo" },
})
export class ExtendedAirportInfo {
  @prop({ required: true })
  airportCode!: string;

  @prop()
  defaultInitialAltitudeText?: string;

  @prop({ required: true })
  defaultExpectInMinutesText?: string;

  @prop()
  hasSIDs?: boolean;

  @prop()
  initialAltitude?: number;

  @prop()
  initialPhrasing?: InitialPhrasingOptions;

  @prop()
  expectInMinutes?: number;
}

const ExtendedAirportInfoModel = getModelForClass(ExtendedAirportInfo);

export default ExtendedAirportInfoModel;
