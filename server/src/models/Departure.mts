import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { ExtendedAirportInfo } from "./ExtendedAirportInfo.mjs";

export class InitialAltitude {
  @prop({ required: true })
  Altitude!: number;

  @prop({ required: true })
  AircraftClass!: string;
}

enum InitialPhrasingOptions {
  Unknown = "Unknown",
  Maintain = "Maintain",
  ClimbViaSid = "ClimbViaSid",
  ClimbViaSidExceptMaintain = "ClimbViaSidExceptMaintain",
  ClimbViaDepartureExceptMaintain = "ClimbViaDepartureExceptMaintain",
  SeeNote = "SeeNote",
}

@modelOptions({ options: { customName: "departure" } })
export class Departure {
  @prop({ required: true })
  AirportCode!: string;

  @prop({ required: true })
  SID!: string;

  @prop({ required: true })
  Telephony!: string;

  @prop({ required: true, type: [String] })
  Fixes!: string[];

  @prop({ enum: InitialPhrasingOptions, default: InitialPhrasingOptions.Unknown })
  InitialPhrasing?: InitialPhrasingOptions;

  @prop({ default: 0 })
  ExpectTopAltitudeInMinutes!: number;

  @prop({ default: false })
  IsRNAV!: boolean;

  @prop()
  expectInMinutes?: number;

  @prop()
  expectRequired?: boolean;

  @prop({ type: () => [InitialAltitude] })
  InitialAltitudes!: InitialAltitude[];

  @prop({ type: String })
  Charts?: Map<string, string>;
}

const DepartureModel = getModelForClass(Departure);

export default DepartureModel;
