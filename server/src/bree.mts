import Bree from "bree";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import { publishUpdates } from "./services/vatsim.mjs";

const logger = mainLogger.child({ service: "bree" });

enum JobName {
  GetVatsimData = "getVatsimData",
  GetVatsimEndpoints = "getVatsimEndpoints",
  ImportAirports = "importAirports",
  GetVatsimTransceivers = "getVatsimTransceivers",
}

let io: SocketIOServer;

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: process.env.TS_NODE ? "mts" : "mjs",
  logger: false, // Don't log to console outside of errorHandler and workerMessageHandler
  jobs:
    // Don't add jobs if this is running in a test environment
    ENV.NODE_ENV !== "test"
      ? [
          {
            name: JobName.ImportAirports,
            // Wait for an hour after startup to get the first round of data. This ensures
            // it doesn't ping for new airports every time I run in development.
            timeout: "1 hour",
            interval: ENV.AIRPORT_REFRESH_INTERVAL,
          },
          {
            name: JobName.GetVatsimEndpoints,
            timeout: 0,
            interval: "every 24 hours",
          },
          {
            name: JobName.GetVatsimData,
            timeout: "10 seconds", // Delay the initial retrieval to give time for things to spin up.
            interval: ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS,
          },
          {
            name: JobName.GetVatsimTransceivers,
            timeout: "60 seconds", // Delay the initial retrieval to give time for things to spin up.
            interval: ENV.VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL,
          },
        ]
      : [],
  errorHandler: (error, workerMetadata) => {
    logger.error(`Error running worker ${workerMetadata.name}: ${error}`);
  },
  workerMessageHandler: async ({ name, message }) => {
    if (message === "sendUpdates") {
      await publishUpdates(io);
    }
  },
})
  .on("worker created", (name) => {
    logger.debug(`Worker created: ${name}`);
  })
  .on("worker deleted", (name) => {
    logger.debug(`Worker deleted: ${name}`);
  });

export async function startBree(ioInstance: SocketIOServer) {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  io = ioInstance;
  await bree.start();
}

export async function stopBree() {
  if (ENV.NODE_ENV === "test") {
    return;
  }
  await bree.stop();
}
