import mongoose from "mongoose";
import "./models/Aircraft.mjs";
import "./models/FlightPlan.mjs";
import "./models/AirportInfo.mjs";
import "./models/FlightAwareRoute.mjs";
import "./models/Departure.mjs";
import { ENV } from "./env.mjs";
import debug from "debug";

const logger = debug("plan-verifier:database");

export async function connectToDatabase() {
  const url = ENV.MONGO_DB_CONNECTION_STRING;

  mongoose.set("debug", ENV.MONGOOSE_DEBUG);
  if (ENV.NODE_ENV === "production") {
    mongoose.set("autoIndex", false);
  }

  if (!url) {
    logger(`No database connection string provided for MONGO_DB_CONNECTION_STRING`);
    return;
  }

  logger(`Connecting to database at ${url}...`);
  const connect = mongoose.connect(url, {
    dbName: ENV.MONGO_DB_NAME,
  });

  await connect
    .then((db) => {
      logger("Connected to database");
    })
    .catch((err) => {
      // Auto-reconnect logic from:
      // https://team.goodeggs.com/reconnecting-to-mongodb-when-mongoose-connect-fails-at-startup-83ca8496ca02
      logger(`Failed to connect to mongo on startup - retrying in 5 secconds:\n${err}`);
      setTimeout(connectToDatabase, 5000);
    });
}

export async function disconnectFromDatabase() {
  logger("Disconnecting from the database...");
  await mongoose.disconnect();
}
