import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

export class InitialAltitude {
  @prop({ required: true })
  Altitude!: number;

  @prop({ required: true })
  AircraftClass!: string;
}

@modelOptions({ options: { customName: "departure" } })
export class Departure {
  @prop({ required: true })
  SID!: string;

  @prop({ required: true })
  Telephony!: string;

  @prop({ required: true, type: [String] })
  Fixes!: string[];

  @prop({ default: false })
  ClimbViaSid!: boolean;

  @prop({ default: 0 })
  ExpectTopAltitudeInMinutes!: number;

  @prop({ default: false })
  IsRNAV!: boolean;

  @prop({ type: () => [InitialAltitude] })
  InitialAltitudes!: InitialAltitude[];
}

const DepartureModel = getModelForClass(Departure);

export default DepartureModel;
