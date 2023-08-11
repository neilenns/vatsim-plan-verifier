import {
  prop,
  getModelForClass,
  modelOptions,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";

@modelOptions({
  options: { customName: "airline" },
  schemaOptions: {
    collection: "airlines",
  },
})
class Airline {
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
