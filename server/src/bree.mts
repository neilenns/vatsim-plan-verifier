import Bree from "bree";
import path from "path";
import { fileURLToPath } from "url";
import debug from "debug";
import { ENV } from "./env.mjs";

const logger = debug("plan-verifier:bree");

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: process.env.TS_NODE ? "mts" : "mjs",
  logger: false, // Don't log to console outside of errorHandler and workerMessageHandler
  jobs: [
    {
      name: "importAirports",
      // Wait for an hour after startup to get the first round of data. This ensures
      // it doesn't ping for new airports every time I run in development.
      timeout: "1 hour",
      interval: ENV.AIRPORT_REFRESH_INTERVAL,
    },
  ],
  errorHandler: (error, workerMetadata) => {
    logger(`Error running worker ${workerMetadata.name}: ${error}`);
  },
  workerMessageHandler: ({ name, message }) => {
    logger(`Worker ${name} sent message: ${message}`);
  },
});

export default bree;
