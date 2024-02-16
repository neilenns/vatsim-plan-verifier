import {
  DocumentType,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

@modelOptions({
  options: { customName: "airline" },
  schemaOptions: {
    collection: "airlines",
  },
})
@plugin(SpeedGooseCacheAutoCleaner)
export class Airline {
  @prop({ required: true, index: true })
  airlineCode!: string;

  @prop({ required: true })
  telephony!: string;

  public static async findByAirlineCode(
    this: ReturnModelType<typeof Airline>,
    airlineCode: string
  ) {
    return this.find({ airlineCode: airlineCode });
  }
}

export const AirlineModel = getModelForClass(Airline);
export type AirlineDocument = DocumentType<Airline>;
