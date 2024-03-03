import axios, { type AxiosResponse } from "axios";
import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import type IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import mainLogger, { flush } from "../logger.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";
import postMessage from "../utils/postMessage.mjs";

const logger = mainLogger.child({ service: "getVatsimEndpoints" });

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();

try {
  const endpointUrl = "https://status.vatsim.net/status.json";

  logger.info("Downloading latest VATSIM endpoints");

  const response: AxiosResponse<IVatsimEndpoints> = await axios.get(endpointUrl);

  // There's only two endpoints the code cares about right now so just create and store
  // those two endpoints directly.
  if (response.status === 200) {
    await VatsimEndpointModel.deleteMany({});

    await new VatsimEndpointModel({
      feed: "v3",
      href: response.data.data.v3[0],
    }).save();

    await new VatsimEndpointModel({
      feed: "transceivers",
      href: response.data.data.transceivers[0],
    }).save();

    logger.info("Done downloading latest VATSIM endpoints");
  } else {
    logger.error(`Unable to retrieve VATSIM endpoints: ${response.status} ${response.statusText}`);
  }
} catch (err) {
  const error = err as Error;

  logger.error(`Unable to retrieve VATSIM endpoints: ${error.message}`, error);
} finally {
  await disconnectFromDatabase();
  await flush();
}

if (!postMessage("done")) {
  process.exit(0);
}
