// From https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import addAircraft from "./setup/addAircraft.mjs";
import addAirlines from "./setup/addAirlines.mjs";
import addAirports from "./setup/addAirports.mjs";
import addFlightAwareRoutes from "./setup/addFlightAwareRoutes.mjs";
import addPreferredRoutes from "./setup/addPreferredRoutes.mjs";
import addDepartures from "./setup/addDepartures.mjs";

let mongoServer: MongoMemoryServer;
// This is to ensure any network calls made by the tests don't actually
// go anywhere and result in a 404. There's no need to actually mock
// any of the REST API calls made by the server.
let mock = new MockAdapter(axios);

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

  // Populate the database
  await addAirports();
  await addAircraft();
  await addAirlines();
  await addFlightAwareRoutes();
  await addPreferredRoutes();
  await addDepartures();
}

export async function mochaGlobalTeardown() {
  await mongoose.disconnect();
  await mongoServer.stop();
  mock.restore();
}
