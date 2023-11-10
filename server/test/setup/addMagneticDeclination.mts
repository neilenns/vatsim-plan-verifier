import { MagneticDeclinationModel } from "../../src/models/MagneticDeclination.mjs";

const magneticDecliations = [
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1b",
    icao: "KPDX",
    magneticDeclination: -14.84885,
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1c",
    icao: "KSEA",
    magneticDeclination: -15.22644,
  },
];

export default async function setup() {
  await Promise.all(
    magneticDecliations.map(async (magneticDecliation) => {
      const record = new MagneticDeclinationModel(magneticDecliation);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
