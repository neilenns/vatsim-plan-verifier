import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import mainLogger from "../logger.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";
import { getVatsimTunedTransceivers } from "../services/vatsimTunedTransceivers.mjs";

const logger = mainLogger.child({ service: "getVatsimTransceivers" });

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();

try {
  const transceiverEndpoint = await VatsimEndpointModel.findEndpoint("transceivers");

  if (!transceiverEndpoint) {
    logger.warn(`No VATSIM transceiver endpoint available`);
    process.exit(0);
  }

  await getVatsimTunedTransceivers(transceiverEndpoint.href);
} catch (error) {
  logger.error(`Unable to retrieve VATSIM transceivers: ${error}`);
}

await disconnectFromDatabase();

// Signal the job is complete
process.exit(0);
