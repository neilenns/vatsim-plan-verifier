import { Model, Schema, model } from "mongoose";
import IAirportInfoDocument from "../interfaces/IAirportInfoDocument.mjs";
import { getMagneticDeclination } from "../controllers/magneticDeclination.mjs";
import autopopulate from "mongoose-autopopulate";

export interface IAirportInfo extends IAirportInfoDocument {}
export interface IAirportInfoModel extends Model<IAirportInfo> {}

const airportInfoSchema = new Schema(
  {
    airportCode: {
      type: String,
      required: true,
      unique: true,
      alias: "airport_code",
    },
    alternateIdent: {
      type: String,
      required: false,
      alias: "alternate_ident",
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
    lidCode: {
      type: String,
      required: false,
      alias: "code_lid",
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
    wikiUrl: {
      type: String,
      required: false,
      alias: "wiki_url",
    },
    airportFlightsUrl: {
      type: String,
      required: false,
      alias: "airport_flights_url",
    },
    alternatives: {
      type: [String],
      required: false,
    },
    magneticDeclination: {
      type: Number,
      required: false,
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

// Look up the magnetic declination for the airport on save so it can be used
// repeatedly elsewhere without constantly making calls to the web service to
// get the current value.
airportInfoSchema.pre("save", async function () {
  // If the airport was created with a magnetic declination value then
  // don't bother trying to request it from the web service. This is primarily
  // for unit testing where the decliation will be provided as part of test
  // setup.
  if (this.magneticDeclination) {
    return;
  }

  const result = await getMagneticDeclination(this.latitude, this.longitude);

  if (!result.success) {
    return;
  }

  // As best I can tell the magnetic declination is returned as a positive
  // number for west and a negative number for east. So we need to negate
  // the result to get the correct value for math later on.
  this.magneticDeclination = -result.data;
});

airportInfoSchema.plugin(autopopulate);
airportInfoSchema.set("toJSON", { virtuals: true, aliases: false });
airportInfoSchema.set("toObject", { virtuals: true, aliases: false });

const AirportInfoModel: IAirportInfoModel = model<IAirportInfo, IAirportInfoModel>(
  "airportinfo",
  airportInfoSchema
);

export default AirportInfoModel;
