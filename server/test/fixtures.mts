import { MongoMemoryServer } from "mongodb-memory-server";
import * as db from "../src/database.mjs";

var mongod: MongoMemoryServer;

export async function mochaGlobalSetup() {
  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();
  console.log(uri);

  process.env.MONGO_DB_CONNECTION_STRING = mongod.getUri();

  await db.connectToDatabase();
}

export async function mochaGlobalTeardown() {
  await db.disconnectFromDatabase();
  await mongod.stop();
}
