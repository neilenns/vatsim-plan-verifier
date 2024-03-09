import {
  type DocumentType,
  type ReturnModelType,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  options: { customName: "airline" },
  schemaOptions: {
    collection: "airlines",
  },
})
export class Airline {
  @prop({ required: true, index: true })
  airlineCode!: string;

  @prop({ required: true })
  telephony!: string;

  public static async findByAirlineCode(
    this: ReturnModelType<typeof Airline>,
    airlineCode: string
  ): Promise<AirlineDocument[]> {
    return await this.find({ airlineCode });
  }
}

export const AirlineModel = getModelForClass(Airline);
export type AirlineDocument = DocumentType<Airline>;
