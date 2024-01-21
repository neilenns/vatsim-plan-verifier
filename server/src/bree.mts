import Bree from "bree";
import debug from "debug";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import { ENV } from "./env.mjs";
import { publishUpdates } from "./services/vatsim.mjs";

enum JobName {
  GetVatsimData = "getVatsimData",
  GetVatsimEndpoints = "getVatsimEndpoints",
  ImportAirports = "importAirports",
  GetVatsimTransceivers = "getVatsimTransceivers",
}

const logger = debug("plan-verifier:jobs");

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
    logger(`Error running worker ${workerMetadata.name}: ${error}`);
  },
  workerMessageHandler: async ({ name, message }) => {
    if (message === "sendUpdates") {
      await publishUpdates(io);
    }
  },
});

export async function startBree(ioInstance: SocketIOServer) {
  io = ioInstance;
  await bree.start();
}

export async function stopBree() {
  await bree.stop();
}

export async function setVastimDataUpdateInterval(interval: string) {
  await setUpdateInterval(JobName.GetVatsimData, interval);
}

/**
 * Sets the update interval for a bree job to the new interval
 * @param jobName The name of the job
 * @param interval The update interval
 */
async function setUpdateInterval(jobName: JobName, interval: string) {
  try {
    await bree.stop(jobName);
    const jobIndex = bree.config.jobs.findIndex((j) => j.name === jobName);

    if (!jobIndex) {
      logger(`Unable to find job ${jobName} to set the job interval`);
      return;
    }

    const job = bree.config.jobs[jobIndex];

    if (job.interval === interval) {
      logger(`Job ${jobName} is already running on interval ${interval}`);
      return;
    }

    bree.config.jobs[jobIndex] = { ...bree.config.jobs[jobIndex], interval: interval };
    await bree.start(jobName);

    logger(`Updated ${jobName} to run on interval ${interval}`);
  } catch (error) {
    logger(`Failed to update ${jobName} interval: ${error}`);
  }
}
