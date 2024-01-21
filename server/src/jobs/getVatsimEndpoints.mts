import axios, { AxiosResponse } from "axios";
import debug from "debug";
import process from "node:process";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { VatsimEndpointModel } from "../models/VatsimEndpoint.mjs";

const logger = debug("jobs:getVatsimEndpoints");

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();

try {
  const endpointUrl = "https://status.vatsim.net/status.json";

  logger("Downloading latest VATSIM endpoints");

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

    logger("Done downloading latest VATSIM endpoints");
  } else {
    logger(`Unable to retrieve VATSIM endpoints: ${response.status} ${response.statusText}`);
  }
} catch (error) {
  logger(`Unable to retrieve VATSIM endpoints: ${error}`);
}

await disconnectFromDatabase();

// Signal the job is complete
// eslint-disable-next-line unicorn/no-process-exit
process.exit(0);
