import { PilotStatsModel } from "../../src/models/PilotStats.mjs";

const pilotStats = [
  {
    _id: "64d816a144012e5b4de814ae",
    cid: 1525628,
    atc: 494.5,
    pilot: 135.48,
    s1: 443.69,
    s2: 50.81,
    s3: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    i1: 0,
    i2: 0,
    i3: 0,
    sup: 0,
    adm: 0,
  },
];

export default async function setup() {
  await Promise.all(
    pilotStats.map(async (pilot) => {
      const record = new PilotStatsModel(pilot);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
