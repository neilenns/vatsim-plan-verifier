import { MetarModel } from "../../src/models/Metar.mjs";

const metar = [
  // KSEA altimeter 29.95
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1b",
    icao: "KSEA",
    metar:
      "KSEA 040053Z 21012KT 10SM FEW024 SCT042 OVC060 17/14 A2995 RMK AO2 RAB2356E35 SLP146 P0003 T01670144 $",
    source: "Vatsim",
    updatedAt: new Date(),
    altimeter: 29.95,
    __v: 0,
  },
  // KGEG altimeter 29.91
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1c",
    icao: "KGEG",
    metar:
      "KGEG 040053Z 21012KT 10SM FEW024 SCT042 OVC060 17/14 A2991 RMK AO2 RAB2356E35 SLP146 P0003 T01670144 $",
    source: "Vatsim",
    updatedAt: new Date(),
    altimeter: 29.95,
    __v: 0,
  },
  // KPDX altimeter 28.91
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1d",
    icao: "KPDX",
    metar:
      "KPDX 040053Z 21012KT 10SM FEW024 SCT042 OVC060 17/14 A2891 RMK AO2 RAB2356E35 SLP146 P0003 T01670144 $",
    source: "Vatsim",
    updatedAt: new Date(),
    altimeter: 29.95,
    __v: 0,
  },
];

export default async function setup() {
  await Promise.all(
    metar.map(async (metar) => {
      const record = new MetarModel(metar);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
