import {
  DocumentType,
  Ref,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import autopopulate from "mongoose-autopopulate";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { getMagneticDeclination } from "../controllers/magneticDeclination.mjs";
import mainLogger from "../logger.mjs";
import { ExtendedAirportInfo } from "./ExtendedAirportInfo.mjs";
import { MagneticDeclinationDocument, MagneticDeclinationModel } from "./MagneticDeclination.mjs";

const logger = mainLogger.child({ service: "airportInfoModel" });

@modelOptions({
  options: { customName: "airportinfo" },
  schemaOptions: {
    collection: "airportinfo",
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(autopopulate)
export class AirportInfo {
  @prop({ required: true, index: true, unique: true, alias: "airport_code" })
  airportCode!: string;

  @prop({ required: false, alias: "code_icao" })
  icaoCode?: string;

  @prop({ required: false, alias: "code_iata" })
  iataCode?: string;

  @prop({ required: false })
  name?: string;

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

  /**
   * Calculates the distance from a point to an airport given the point's latitude and longitude and the airport code.
   * If no data for the airport exists, undefined is returned.
   * If any of the parameters are undefined, undefined is returned.
   * @param this The AirportInfoModel
   * @param airportCode The airport code to calculate the distance to
   * @param latitude The latitude of the location to calculate the distance to
   * @param longitude The longitude of the location to calculate the distance to
   * @returns The distance in kilometers, or undefined if the calculation couldn't be done
   */
  public static async distanceTo(
    this: ReturnModelType<typeof AirportInfo>,
    airportCode?: string,
    latitude?: number,
    longitude?: number
  ): Promise<number | undefined> {
    if (!airportCode || !latitude || !longitude) {
      return undefined;
    }

    // Look up the airport info, first in the database cache then via web service
    // if necessary.
    const airportInfo = await getAirportInfo(airportCode);

    if (!airportInfo.success) {
      return undefined;
    }

    if (!airportInfo.data.latitude || !airportInfo.data.longitude) {
      return undefined;
    }

    const position = new LatLon(latitude, longitude);
    const airportPosition = new LatLon(airportInfo.data.latitude, airportInfo.data.longitude);
    const distanceToAirport = position.distanceTo(airportPosition) / 1000; // Convert to km

    return distanceToAirport;
  }

  // Returns the magnetic declination, using the cached database value if it exists.
  // Otherwise it will contact a web service to get the magnetic declination and
  // cache the result in the database. If the web service call fails the cached
  // value, if any, will be returned even if it expired.
  public async getMagneticDeclination(this: DocumentType<AirportInfo>): Promise<number | null> {
    // Try finding a cached value in the database first.
    const cachedMagneticDeclination = await MagneticDeclinationModel.findByICAO(this.airportCode);

    if (cachedMagneticDeclination && !(await cachedMagneticDeclination?.isExpired())) {
      return cachedMagneticDeclination.magneticDeclination;
    }

    if (!this.latitude || !this.longitude) {
      return null;
    }

    // If there's no cached value or the cache is stale then get it from the web service and cache it.
    const result = await getMagneticDeclination(this.latitude, this.longitude);

    // If fetch fails then we will fall back to cached data if it is available.
    if (!result.success) {
      logger.error(
        `Unable to fetch updated magnetic declination for ${this.airportCode}: ${result.error}`
      );
      return cachedMagneticDeclination?.magneticDeclination ?? null;
    }

    // If no data was returned fall back to the cached data if it is available.
    if (!result.data) {
      logger.info(`No magnetic declination data returned for ${this.airportCode}`);
      return cachedMagneticDeclination?.magneticDeclination ?? null;
    }

    // Save the fetched declination and return it. This code strikes me as total nonsense,
    // why is it so hard to either update or create a new document with mongoose
    // and have it run pre-save middleware? (No, you can't use findOneOrUpdate for this)

    // As best I can tell the magnetic declination is returned as a positive
    // number for west and a negative number for east. So we need to negate
    // the result to get the correct value for math later on.
    let savedDeclination: MagneticDeclinationDocument;
    if (cachedMagneticDeclination) {
      cachedMagneticDeclination.magneticDeclination = -result.data;
      cachedMagneticDeclination.updatedAt = new Date(); // Force the updatedAt date to update even if the declination didn't change
      savedDeclination = await cachedMagneticDeclination.save();
    } else {
      savedDeclination = await new MagneticDeclinationModel({
        icao: this.airportCode,
        magneticDeclination: -result.data,
      }).save();
    }

    return savedDeclination.magneticDeclination;
  }
}

export const AirportInfoModel = getModelForClass(AirportInfo);
export type AirportInfoDocument = DocumentType<AirportInfo>;
