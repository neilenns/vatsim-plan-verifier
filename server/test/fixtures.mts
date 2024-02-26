// From https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { applySpeedGooseCacheLayer, SharedCacheStrategies } from "speedgoose";
import addAircraft from "./setup/addAircraft.mjs";
import addAirlines from "./setup/addAirlines.mjs";
import addAirports from "./setup/addAirports.mjs";
import addCustomMessages from "./setup/addCustomMessages.mjs";
import addDepartures from "./setup/addDepartures.mjs";
import addExtendedAirportInfo from "./setup/addExtendedAirportInfo.mjs";
import addFlightAwareRoutes from "./setup/addFlightAwareRoutes.mjs";
import addGroundRestrictions from "./setup/addGroundRestrictions.mjs";
import addMagneticDeclination from "./setup/addMagneticDeclination.mjs";
import addMetar from "./setup/addMetar.mjs";
import addPilotStats from "./setup/addPilotStats.mjs";
import addPreferredRoutes from "./setup/addPreferredRoutes.mjs";
import addNavaids from "./setup/addNavaids.mjs";

let mongoServer: MongoMemoryServer;
// This is to ensure any network calls made by the tests don't actually
// go anywhere and result in a 404. There's no need to actually mock
// any of the REST API calls made by the server. Individual tests
// that do depend on REST APIs set up their own mocks, for example
// the airportInfo.spec.mts tests.
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
  await Promise.all([
    addNavaids(),
    addAirports(),
    addAircraft(),
    addAirlines(),
    addFlightAwareRoutes(),
    addPreferredRoutes(),
    addDepartures(),
    addCustomMessages(),
    addExtendedAirportInfo(),
    addMagneticDeclination(),
    addPilotStats(),
    addMetar(),
    addGroundRestrictions(),
  ]);

  // Caching isn't really needed but without it the tests won't run
  // since so much of the main code needs cacheResult() to be defined.
  applySpeedGooseCacheLayer(mongoose, {
    sharedCacheStrategy: SharedCacheStrategies.IN_MEMORY,
    defaultTtl: 60 * 10,
  });
}

export async function mochaGlobalTeardown() {
  await mongoose.disconnect();
  await mongoServer.stop();
  mock.restore();
}
