// From https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import flightAwareAirportMock from "./mocks/flightAwareAirport.mjs";
import addAirports from "./databaseSetup/addAirports.mjs";

var mongoServer: MongoMemoryServer;
var mock = new MockAdapter(axios);

export async function mochaGlobalSetup() {
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  console.log(`Mongoose in-memory server created: ${mongoUri}`);

  await mongoose.connect(mongoUri);
  await mongoose.connection.db.dropDatabase();

  // Set a fake API key for FlightAware
  process.env.FLIGHTAWARE_API_KEY = "testkey";

  // Register all the network mocks
  // flightAwareAirportMock(mock);

  // Populate the database
  addAirports();
}

export async function mochaGlobalTeardown() {
  await mongoose.disconnect();
  await mongoServer.stop();
  mock.restore();
}
