// From https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

var mongoServer: MongoMemoryServer;

export async function mochaGlobalSetup() {
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  console.log(`Mongoose in-memory server created: ${mongoUri}`);

  await mongoose.connect(mongoUri);
  await mongoose.connection.db.dropDatabase();
}

export async function mochaGlobalTeardown() {
  await mongoose.disconnect();
  await mongoServer.stop();
}
