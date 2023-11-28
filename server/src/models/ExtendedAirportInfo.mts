import {
  prop,
  getModelForClass,
  modelOptions,
  DocumentType,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import { InitialPhrasingOptions } from "./Departure.mjs";
import autopopulate from "mongoose-autopopulate";

@modelOptions({
  options: { customName: "extendedairportinfo" },
  schemaOptions: { collection: "extendedairportinfo" },
})
@plugin(autopopulate)
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

  @prop()
  expectInMiles?: string;

  @prop({ type: () => [String] })
  heavyRunways?: string[];
}

export const ExtendedAirportInfoModel = getModelForClass(ExtendedAirportInfo);
export type ExtendedAirportInfoDocument = DocumentType<ExtendedAirportInfo>;
