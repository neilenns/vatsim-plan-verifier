import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "departure" } })
export class Departure {
  @prop({ required: true })
  SID!: string;

  @prop({ required: true, type: [String] })
  Fixes!: string[];

  @prop({ default: false })
  ClimbViaSid!: boolean;

  @prop({ default: 0 })
  InitialAltitude!: number;

  @prop({ default: 0 })
  ExpectTopAltitudeInMinutes!: number;

  @prop({ default: false })
  IsRNAV!: boolean;
}

const DepartureModel = getModelForClass(Departure);

export default DepartureModel;
