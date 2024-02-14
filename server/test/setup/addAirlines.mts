import { AirlineModel } from "../../src/models/Airline.mjs";

const airlines = [{ _id: "64b409858f265c50318d9056", airlineCode: "ASA", telephony: "ALASKA" }];

export default async function setup() {
  const models = airlines.map((airline) => new AirlineModel(airline));
  try {
    await AirlineModel.bulkSave(models);
  } catch (err) {
    console.log(err);
  }
}
