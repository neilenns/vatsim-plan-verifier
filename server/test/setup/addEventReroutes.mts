import { EventRerouteModel } from "../../src/models/EventReroutes.mjs";

const reroutes = [
  {
    departure: "KSEA",
    flow: "ANY",
    fix: "JINMO",
    replacement: "POWEL JUNEJ JINMO +",
    isActive: true,
  },
  {
    departure: "KSEA",
    flow: "SOUTH",
    fix: "SUMMA",
    replacement: "POWEL JUNEJ JINMO +",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "SOUTH",
    fix: "SUMMA",
    replacement: "POWEL JUNEJ JINMO +",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "COUGA",
    departureFrequency: "North: 118.100",
    isActive: true,
  },
];

export default async function setup() {
  const models = reroutes.map((rerorute) => new EventRerouteModel(rerorute));

  try {
    await EventRerouteModel.bulkSave(models);
  } catch (err) {
    console.log(err);
  }
}
