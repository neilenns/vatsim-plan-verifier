import mongoose from "mongoose";
import { SharedCacheStrategies, applySpeedGooseCacheLayer } from "speedgoose";
import { ENV } from "./env.mjs";
import mainLogger, { CustomLevelsLogger } from "./logger.mjs";
import "./models/Aircraft.mjs";
import "./models/AirportInfo.mjs";
import "./models/Departure.mjs";
import "./models/FlightAwareRoute.mjs";
import "./models/FlightPlan.mjs";
import { MongoBulkWriteError } from "mongodb";

const logger = mainLogger.child({ service: "database" });

export function logMongoBulkErrors(logger: CustomLevelsLogger, err: unknown) {
  const error = err as Error;

  // Bulk write errors are super annoying. The actual write errors
  // are a OneOrMore<T> which means you have to check and see if it's an
  // array to know how to write out the error messages.
  // instanceOf MongoBulkWriteError doesn't work either for some reason,
  // you have to check by the error.name property intsead.
  if (error.name === "MongoBulkWriteError") {
    const writeErrors = (err as MongoBulkWriteError).writeErrors;

    if (Array.isArray(writeErrors)) {
      writeErrors.forEach((writeError) => {
        logger.error(writeError.errmsg);
      });
    } else {
      logger.error(writeErrors);
    }
  } else {
    logger.error(`Unable to save to database: ${error.message}.`);
  }
}

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
    .then(async (db) => {
      logger.debug("Connected");
      applySpeedGooseCacheLayer(mongoose, {
        sharedCacheStrategy: SharedCacheStrategies.IN_MEMORY,
        defaultTtl: 60 * 10,
      });
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
