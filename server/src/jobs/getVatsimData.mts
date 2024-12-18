import DotLocker from "dotlocker";
import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import mainLogger, { flush } from "../logger.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";
import { getVatsimData } from "../services/vatsim.mjs";
import postMessage from "../utils/postMessage.mjs";

const logger = mainLogger.child({ service: "getVatsimData" });

// Using lockSync since this is the only thing running in this process
// and node was incorrectly exiting with code 13 when using the async method.
const dispose = DotLocker.lockSync("airports", {
  lockPath: "airports.lock",
  retries: 0, // If the lock is in place there's no need to retry since bree will auto-run this job again anyway
  staleInterval: 1000 * 60 * 10, // 10 minutes, to cover how long it takes for airports to update (~6 minutes)
});

if (dispose == null) {
  logger.warn(`Airport updates in progress, skipping VATSIM data update`);
} else {
  await connectToDatabase();

  try {
    const dataEndpoint = await VatsimEndpointModel.findEndpoint("v3");

    if (dataEndpoint == null) {
      logger.warn(`No VATSIM data endpoint available`);
      process.exit(0);
    }

    await getVatsimData(dataEndpoint.href);
  } catch (err) {
    const error = err as Error;

    logger.error(`Unable to retrieve VATSIM data: ${error.message}`, error);
  } finally {
    await disconnectFromDatabase();
    await flush();
    dispose();
  }

  postMessage("sendUpdates");
}

if (!postMessage("done")) {
  process.exit(0);
}
