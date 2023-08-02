import { PreferredRouteModel } from "../../src/models/PreferredRoute.mjs";

const data = [
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 270,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[PT]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 130,
    minimumRequiredSpeed: 250,
    equipmentSuffixes: "[GLZ]",
    EngineTypes: "J",
  },
];

export default async function setup() {
  await Promise.all(
    data.map(async (item) => {
      const record = new PreferredRouteModel(item);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
