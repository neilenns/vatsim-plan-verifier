import { prop, getModelForClass, modelOptions, ReturnModelType } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "magneticdeclination" } })
export class MagneticDeclination {
  @prop({ required: true })
  airportCode!: string;

  @prop({ required: true, index: true, unique: true })
  magneticDeclination!: number;

  @prop({ type: Date, expires: "30 days", required: true, default: Date.now })
  createdAt!: Date;

  public static async findByAirportCode(
    this: ReturnModelType<typeof MagneticDeclination>,
    airportCode: string
  ): Promise<number | null> {
    const result = await this.findOne({ airportCode });
    return result?.magneticDeclination ?? null;
  }
}

const MagneticDeclinationModel = getModelForClass(MagneticDeclination);

export default MagneticDeclinationModel;