import { GroundRestrictionModel } from "../../src/models/GroundRestrictions.mjs";

const restrictions = [
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1a",
    airportCode: "KSEA",
    equipmentCodes: ["C172"],
    groups: [5, 6],
    message: `Unable to taxi on Bravo`,
  },
];

export default async function setup() {
  await Promise.all(
    restrictions.map(async (restriction) => {
      const record = new GroundRestrictionModel(restriction);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
