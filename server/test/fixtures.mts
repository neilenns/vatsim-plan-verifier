// From https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
// import flightAwareAirportMock from "./mocks/flightAwareAirport.mjs";
import addAircraft from "./databaseSetup/addAircraft.mjs";
import addAirlines from "./databaseSetup/addAirlines.mjs";
import addAirports from "./databaseSetup/addAirports.mjs";

var mongoServer: MongoMemoryServer;
// This is to ensure any network calls made by the tests don't actually
// go anywhere and result in a 404. There's no need to actually mock
// any of the REST API calls made by the server.
var mock = new MockAdapter(axios);

export async function mochaGlobalSetup() {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 49427,
    },
  });

  const mongoUri = mongoServer.getUri();
  console.log(`Mongoose in-memory server created: ${mongoUri}`);

  await mongoose.connect(mongoUri);
  await mongoose.connection.db.dropDatabase();

  // Set a fake API key for FlightAware
  process.env.FLIGHTAWARE_API_KEY = "testkey";

  // Register all the network mocks
  // flightAwareAirportMock(mock);

  // Populate the database
  await addAirports();
  await addAircraft();
  await addAirlines();
}

export async function mochaGlobalTeardown() {
  await mongoose.disconnect();
  await mongoServer.stop();
  mock.restore();
}
