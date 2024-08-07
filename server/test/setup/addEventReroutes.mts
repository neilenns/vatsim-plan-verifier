import { EventRerouteModel } from "../../src/models/EventReroutes.mjs";

const reroutes = [
  {
    departure: "KSEA",
    flow: "ANY",
    fix: "JINMO",
    route: "JINMO -> ... POWEL JUNEJ JINMO ...",
    replacement: "POWEL JUNEJ JINMO +",
    isActive: true,
  },
  {
    departure: "KSEA",
    flow: "SOUTH",
    fix: "SUMMA",
    route: "JINMO -> ... POWEL JUNEJ JINMO ...",
    replacement: "POWEL JUNEJ JINMO +",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "SOUTH",
    fix: "SUMMA",
    route: "JINMO -> ... POWEL JUNEJ JINMO ...",
    replacement: "POWEL JUNEJ JINMO +",
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
