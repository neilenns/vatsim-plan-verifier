import DotLocker from "dotlocker";
import process from "node:process";
import { CacheManager, CacheName } from "../cacheManager.mjs";
import { fetchAirportsFromAvioWiki } from "../controllers/airportInfo.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import { ENV } from "../env.mjs";
import mainLogger, { flush } from "../logger.mjs";
import { AirportInfoDocument } from "../models/AirportInfo.mjs";
import postMessage from "../utils/postMessage.mjs";

const logger = mainLogger.child({ service: "importAirports" });

// Using lockSync since this is the only thing running in this process
// and node was incorrectly exiting with code 13 when using the async method.
const dispose = DotLocker.lockSync("airports", {
  lockPath: "airports.lock",
  retries: 10,
  retryInterval: 1000, // 1 second
  staleInterval: 1000 * 60, // 10 minutes, to cover how long it takes to update vatsim data
});

if (!dispose) {
  logger.error(`Unable to retrieve lock for airport update.`);
} else {
  try {
    await connectToDatabase();
    await fetchAirportsFromAvioWiki();
  } catch (error) {
    const err = error as Error;
    logger.error(`Error updating airports: ${err.message}`);
  } finally {
    dispose();
    await disconnectFromDatabase();
  }
}

await flush();
if (!postMessage("done")) {
  process.exit(0);
}
