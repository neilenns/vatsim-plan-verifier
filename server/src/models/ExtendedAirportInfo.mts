import { DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { InitialAltitude } from "./InitialAltitude.mjs";

@modelOptions({
  options: { customName: "extendedairportinfo" },
  schemaOptions: { collection: "extendedairportinfo" },
})
@plugin(autopopulate)
@plugin(SpeedGooseCacheAutoCleaner)
export class ExtendedAirportInfo {
  @prop({ required: true })
  airportCode!: string;

  @prop()
  hasSIDs?: boolean;

  @prop({ type: () => [InitialAltitude], default: [] })
  InitialAltitudes!: InitialAltitude[];

  @prop({ type: () => [String] })
  heavyRunways?: string[];
}

export const ExtendedAirportInfoModel = getModelForClass(ExtendedAirportInfo);
export type ExtendedAirportInfoDocument = DocumentType<ExtendedAirportInfo>;
