import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import mainLogger from "../logger.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";
import { getVatsimData } from "../services/vatsim.mjs";
import postMessage from "../utils/postMessage.mjs";

const logger = mainLogger.child({ service: "getVatsimData" });

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();

try {
  const dataEndpoint = await VatsimEndpointModel.findEndpoint("v3");

  if (!dataEndpoint) {
    logger.error(`No VATSIM data endpoint available`);
    process.exit(0);
  }

  await getVatsimData(dataEndpoint.href);
} catch (error) {
  logger.error(`Unable to retrieve VATSIM data: ${error}`);
}

postMessage("sendUpdates");

await disconnectFromDatabase();

// Signal the job is complete
process.exit(0);
