import Bree from "bree";
import path from "path";
import signale from "signale";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import { ENV } from "./env.mjs";
import { publishUpdates } from "./services/vatsim.mjs";

const getVatsimDataJobName = "getVatsimData";

let io: SocketIOServer;
const logger = signale.scope("bree");

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
    {
      name: "getVatsimEndpoints",
      timeout: 0,
      interval: "every 24 hours",
    },
    {
      name: getVatsimDataJobName,
      timeout: "10 seconds", // Delay the initial retrieval to give time for things to spin up.
      interval: ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS,
    },
    {
      name: "getVatsimTransceivers",
      timeout: "60 seconds", // Delay the initial retrieval to give time for things to spin up.
      interval: ENV.VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL,
    },
  ],
  errorHandler: (error, workerMetadata) => {
    logger.error(`Error running worker ${workerMetadata.name}: ${error}`);
  },
  workerMessageHandler: async ({ name, message }) => {
    if (message === "sendUpdates") {
      logger.time("Publishing updates");
      await publishUpdates(io);
      logger.timeEnd("Publishing updates");
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
  await setUpdateInterval(getVatsimDataJobName, interval);
}

/**
 * Sets the update interval for a bree job to the new interval
 * @param interval The update interval
 */
async function setUpdateInterval(jobName: string, interval: string) {
  try {
    await bree.stop(jobName);
    const jobIndex = bree.config.jobs.findIndex((j) => j.name === jobName);

    if (!jobIndex) {
      logger.error(`Unable to find job ${jobName}`);
      return;
    }

    const job = bree.config.jobs[jobIndex];

    if (job.interval === interval) {
      logger.info(`Job ${jobName} is already running on interval ${interval}`);
      return;
    }

    bree.config.jobs[jobIndex] = { ...bree.config.jobs[jobIndex], interval: interval };
    await bree.start(jobName);

    logger.info(`Updated ${jobName} to run on interval ${interval}`);
  } catch (error) {
    logger.error(`Failed to update ${jobName} interval: ${error}`);
  }
}
