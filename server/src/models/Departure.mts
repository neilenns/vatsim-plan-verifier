import { prop, getModelForClass } from "@typegoose/typegoose";

class Departure {
  @prop({ required: true })
  SID!: string;

  @prop({ required: true })
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

export { Departure, DepartureModel };
