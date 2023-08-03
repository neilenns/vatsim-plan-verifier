import { prop, getModelForClass, modelOptions, ReturnModelType } from "@typegoose/typegoose";

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
  defaultInitialMinutesText?: string;
}

const ExtendedAirportInfoModel = getModelForClass(ExtendedAirportInfo);

export default ExtendedAirportInfoModel;
