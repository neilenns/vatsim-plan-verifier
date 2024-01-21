import debug from "debug";
import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";
import { getVatsimTunedTransceivers } from "../services/vatsimTunedTransceivers.mjs";

const logger = debug("jobs:getVatsimTransceivers");

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();

try {
  const transceiverEndpoint = await VatsimEndpointModel.findEndpoint("transceivers");

  if (!transceiverEndpoint) {
    logger(`No VATSIM transceiver endpoint available`);
    process.exit(0);
  }

  await getVatsimTunedTransceivers(transceiverEndpoint.href);
} catch (error) {
  logger(`Unable to retrieve VATSIM endpoints: ${error}`);
}

await disconnectFromDatabase();

// Signal the job is complete
process.exit(0);
