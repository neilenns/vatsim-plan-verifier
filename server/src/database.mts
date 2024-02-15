import mongoose from "mongoose";
import { SharedCacheStrategies, applySpeedGooseCacheLayer } from "speedgoose";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";

import "./models/Aircraft.mjs";
import "./models/Airline.mjs";
import "./models/AirportInfo.mjs";
import "./models/ApiKey.mjs";
import "./models/Auth0User.mjs";
import "./models/CustomMessages.mjs";
import "./models/Departure.mjs";
import "./models/ExtendedAirportInfo.mjs";
import "./models/FlightAwareRoute.mjs";
import "./models/FlightPlan.mjs";
import "./models/GroundRestrictions.mjs";
import "./models/InitialAltitude.mjs";
import "./models/MagneticDeclination.mjs";
import "./models/Metar.mjs";
import "./models/Navaid.mjs";
import "./models/PilotStats.mjs";
import "./models/PreferredRoute.mjs";
import "./models/QuickReference.mjs";
import "./models/VatsimATIS.mjs";
import "./models/VatsimFlightPlan.mjs";
import "./models/VatsimTunedTransceivers.mjs";
import "./models/VerifierResult.mjs";

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
