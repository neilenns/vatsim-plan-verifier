import { PreferredRouteModel } from "../../src/models/PreferredRoute.mjs";

const data = [
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 270,
    equipmentSuffixes: ["G", "L", "Z"],
    engineTypes: ["T", "J"],
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: ["G", "L", "Z"],
    engineTypes: ["T", "P"],
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 130,
    minimumRequiredSpeed: 250,
    equipmentSuffixes: ["G", "L", "Z"],
    EngineTypes: ["J"],
  },
];

export default async function setup() {
  await Promise.all(
    data.map(async (item) => {
      var record = new PreferredRouteModel(item);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
