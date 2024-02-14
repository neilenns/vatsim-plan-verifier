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
    engineTypes: "J",
  },
];

export default async function setup() {
  const models = data.map((item) => new PreferredRouteModel(item));
  try {
    await PreferredRouteModel.bulkSave(models);
  } catch (err) {
    console.log(err);
  }
}
