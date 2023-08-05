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

  @prop()
  defaultExpectInMinutesText?: string;

  @prop()
  hasSIDs?: boolean;

  @prop()
  initialAltitude?: number;

  @prop({ type: () => String })
  initialPhrasing?: InitialPhrasingOptions;

  @prop()
  expectInMinutes?: number;

  @prop({ type: () => [String] })
  heavyRunways?: string[];
}

const ExtendedAirportInfoModel = getModelForClass(ExtendedAirportInfo);

export default ExtendedAirportInfoModel;
