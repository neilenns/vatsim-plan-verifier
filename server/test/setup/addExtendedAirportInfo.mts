import { ExtendedAirportInfoModel } from "../../src/models/ExtendedAirportInfo.mjs";

const extendedAirportInfo = [
  {
    _id: "64b409858f265c50318d9056",
    airportCode: "KPDT",
    defaultInitialAltitudeText: "Maintain 7,000",
    defaultExpectInMinutesText: "5 minutes",
    hasSIDs: false,
  },
  {
    _id: "64b409858f265c50318d9057",
    airportCode: "KPDX",
    heavyRunways: ["10R", "28L"],
  },
];

export default async function setup() {
  const models = extendedAirportInfo.map((info) => new ExtendedAirportInfoModel(info));
  try {
    await ExtendedAirportInfoModel.bulkSave(models);
  } catch (err) {
    console.log(err);
  }
}
