import DotLocker from "dotlocker";
import process from "node:process";
import { fetchAirportsFromAvioWiki } from "../controllers/airportInfo.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import mainLogger, { flush } from "../logger.mjs";

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
    await disconnectFromDatabase();
  } catch (error) {
    const err = error as Error;
    logger.error(`Error updating airports: ${err.message}`);
  } finally {
    dispose();
  }
}

await flush();
process.exit(0);
