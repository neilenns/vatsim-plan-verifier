import ExtendedAirportInfoModel from "../../src/models/ExtendedAirportInfo.mjs";

const extendedAirportInfo = [
  {
    _id: "64b409858f265c50318d9056",
    airportCode: "KPDT",
    defaultInitialAltitudeText: "Maintain 7,000",
    defaultExpectInMinutesText: "5 minutes",
    hasSIDs: false,
  },
];

export default async function setup() {
  await Promise.all(
    extendedAirportInfo.map(async (info) => {
      const record = new ExtendedAirportInfoModel(info);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
