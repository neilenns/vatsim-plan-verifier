import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import mainLogger, { flush } from "../logger.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";
import { getVatsimTunedTransceivers } from "../services/vatsimTunedTransceivers.mjs";
import postMessage from "../utils/postMessage.mjs";

const logger = mainLogger.child({ service: "getVatsimTransceivers" });

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();

try {
  const transceiverEndpoint = await VatsimEndpointModel.findEndpoint("transceivers");

  if (transceiverEndpoint == null) {
    logger.warn(`No VATSIM transceiver endpoint available`);
    process.exit(0);
  }

  await getVatsimTunedTransceivers(transceiverEndpoint.href);
} catch (err) {
  const error = err as Error;

  logger.error(`Unable to retrieve VATSIM transceivers: ${error.message}`, error);
} finally {
  await disconnectFromDatabase();
  await flush();
}

if (!postMessage("done")) {
  process.exit(0);
}
