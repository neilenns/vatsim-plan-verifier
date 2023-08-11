import { getMagneticDeclination } from "../controllers/magneticDeclination.mjs";
import autopopulate from "mongoose-autopopulate";
import MagneticDeclinationModel from "./MagneticDecliation.mjs";
import {
  modelOptions,
  prop,
  DocumentType,
  plugin,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { ExtendedAirportInfo } from "./ExtendedAirportInfo.mjs";

@modelOptions({
  options: { customName: "airportinfo" },
  schemaOptions: {
    collection: "airportinfo",
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(autopopulate)
class AirportInfoClass {
  @prop({ required: true, index: true, unique: true, alias: "airport_code" })
  airportCode!: string;

  @prop({ required: false, alias: "code_icao" })
  icaoCode?: string;

  @prop({ required: false, alias: "code_iata" })
  iataCode?: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: false })
  elevation?: number;

  @prop({ required: false })
  city?: string;

  @prop({ required: false })
  state?: string;

  @prop({ required: false })
  longitude?: number;

  @prop({ required: false })
  latitude?: number;

  @prop({ required: false })
  timezone?: string;

  @prop({ required: false, alias: "country_code" })
  countryCode?: string;

  @prop({
    ref: () => ExtendedAirportInfo,
    localField: "airportCode",
    foreignField: "airportCode",
    justOne: true,
    autopopulate: true,
  })
  extendedAirportInfo?: Ref<ExtendedAirportInfo>;

  // Returns the magnetic declination, using the cached database value if it exists.
  // Otherwise it will contact a web service to get the magnetic declination and
  // cache the result in the database.
  public async getMagneticDeclination(
    this: DocumentType<AirportInfoClass>
  ): Promise<number | null> {
    // Try finding a cached value in the database first.
    const cachedMagneticDeclination = await MagneticDeclinationModel.findByAirportCode(
      this.airportCode
    );

    if (cachedMagneticDeclination) {
      return cachedMagneticDeclination;
    }

    if (!this.latitude || !this.longitude) {
      return null;
    }

    // If there's no cached value then get it from the web service and cache it.
    const result = await getMagneticDeclination(this.latitude, this.longitude);

    if (!result.success || !result.data) {
      return null;
    }

    // As best I can tell the magnetic declination is returned as a positive
    // number for west and a negative number for east. So we need to negate
    // the result to get the correct value for math later on.
    const savedResult = await new MagneticDeclinationModel({
      airportCode: this.airportCode,
      magneticDeclination: -result.data,
    }).save();

    return savedResult.magneticDeclination;
  }
}

const AirportInfoModel = getModelForClass(AirportInfoClass);

export type AirportInfoDocument = DocumentType<AirportInfoClass>;
export default AirportInfoModel;
