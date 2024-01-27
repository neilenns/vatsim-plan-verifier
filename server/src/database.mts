import mongoose from "mongoose";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import "./models/Aircraft.mjs";
import "./models/AirportInfo.mjs";
import "./models/Departure.mjs";
import "./models/FlightAwareRoute.mjs";
import "./models/FlightPlan.mjs";

const logger = mainLogger.child({ service: "database" });

export async function connectToDatabase() {
  const url = ENV.MONGO_DB_CONNECTION_STRING;

  if (ENV.MONGOOSE_DEBUG) {
    mongoose.set("debug", (collectionName, method, query, doc) => {
      logger.log(`trace`, `${collectionName}.${method}`, {
        query,
        doc,
      });
    });
  }
  if (ENV.NODE_ENV === "production") {
    mongoose.set("autoIndex", false);
  }

  if (!url) {
    logger.error(`No database connection string provided for MONGO_DB_CONNECTION_STRING`);
    return;
  }

  logger.debug(`Connecting to database...`, { mongodb: { connectionString: url } });
  const connect = mongoose.connect(url, {
    dbName: ENV.MONGO_DB_NAME,
  });

  await connect
    .then((db) => {
      logger.debug("Connected");
    })
    .catch((err) => {
      // Auto-reconnect logic from:
      // https://team.goodeggs.com/reconnecting-to-mongodb-when-mongoose-connect-fails-at-startup-83ca8496ca02
      logger.error(`Failed to connect to mongo on startup - retrying in 5 secconds:\n${err}`);
      setTimeout(connectToDatabase, 5000);
    });
}

export async function disconnectFromDatabase() {
  logger.debug("Disconnecting...");
  await mongoose.disconnect();
  logger.debug("Disconnected");
}
