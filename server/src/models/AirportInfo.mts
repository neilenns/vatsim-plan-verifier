import { Model, Schema, model } from "mongoose";
import IAirportInfoDocument from "../interfaces/IAirportInfoDocument.mjs";
import { getMagneticDeclination } from "../controllers/magneticDeclination.mjs";
import autopopulate from "mongoose-autopopulate";
import MagneticDeclinationModel, { MagneticDeclination } from "./MagneticDecliation.mjs";

export interface IAirportInfo extends IAirportInfoDocument {
  getMagneticDeclination: () => Promise<number | undefined>;
}
export interface IAirportInfoModel extends Model<IAirportInfo> {}

const airportInfoSchema = new Schema(
  {
    airportCode: {
      type: String,
      required: true,
      index: true,
      unique: true,
      alias: "airport_code",
    },
    icaoCode: {
      type: String,
      required: false,
      alias: "code_icao",
    },
    iataCode: {
      type: String,
      required: false,
      alias: "code_iata",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    elevation: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    timezone: {
      type: String,
      required: false,
    },
    countryCode: {
      type: String,
      required: false,
      alias: "country_code",
    },
  },
  { collection: "airportinfo" }
);

airportInfoSchema.virtual("extendedAirportInfo", {
  ref: "extendedairportinfo",
  localField: "airportCode",
  foreignField: "airportCode",
  justOne: true,
  autopopulate: true,
});

// Returns the magnetic declination, using the cached database value if it exists.
// Otherwise it will contact a web service to get the magnetic declination and
// cache the result in the database.
airportInfoSchema.methods.getMagneticDeclination = async function (): Promise<number | null> {
  // Try finding a cached value in the database first.
  const cachedMagneticDeclination = await MagneticDeclinationModel.findByAirportCode(
    this.airportCode
  );

  if (cachedMagneticDeclination) {
    return cachedMagneticDeclination;
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
};

airportInfoSchema.plugin(autopopulate);
airportInfoSchema.set("toJSON", {
  virtuals: true,
  aliases: false,
});
airportInfoSchema.set("toObject", {
  virtuals: true,
  aliases: false,
});

const AirportInfoModel: IAirportInfoModel = model<IAirportInfo, IAirportInfoModel>(
  "airportinfo",
  airportInfoSchema
);

export default AirportInfoModel;
