import Airline from "../../src/models/Airline.mjs";

const airlines = [
  { _id: "64b409858f265c50318d9056", airlineCode: "ASA", telephony: "ALASKA" },
];

export default async function setup() {
  await Promise.all(
    airlines.map(async (airline) => {
      var record = new Airline(airline);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
