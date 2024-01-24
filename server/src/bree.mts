import Bree from "bree";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import { publishUpdates } from "./services/vatsim.mjs";

const logger = mainLogger.child({ service: "bree" });
let bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: process.env.TS_NODE ? "mts" : "mjs",
  logger,
  doRootCheck: false,
  jobs: [],
  errorHandler: (error, workerMetadata) => {
    logger.error(`Error running worker ${workerMetadata.name}: ${error}`);
  },
  workerMessageHandler: async ({ name, message }) => {
    if (message === "sendUpdates") {
      await publishUpdates();
    }
  },
});

enum JobName {
  GetVatsimData = "getVatsimData",
  GetVatsimEndpoints = "getVatsimEndpoints",
  ImportAirports = "importAirports",
  GetVatsimTransceivers = "getVatsimTransceivers",
}

// Tracks the list of jobs to create, plus their current interval since Bree
// doesn't store the original interval string anywhere.
class Job {
  interval: string = "";
  options: Partial<Bree.JobOptions> | null = null;
}

const jobs = new Map<JobName, Partial<Job>>();

jobs.set(JobName.GetVatsimData, {
  options: {
    timeout: "10 seconds",
  },
});
jobs.set(JobName.GetVatsimEndpoints, {
  options: {
    timeout: 0,
  },
});
jobs.set(JobName.ImportAirports, {
  options: {
    timeout: false, // Don't start this until its first scheduled instance
  },
});
jobs.set(JobName.GetVatsimTransceivers, {
  options: {
    timeout: "15 seconds",
  },
});

async function deleteJob(jobName: JobName) {
  const definition = jobs.get(jobName);

  // This should never happen
  if (!definition) {
    logger.debug(`Unable to remove job ${jobName}: no definition found.`);
    return null;
  }

  logger.debug(`Removing job ${jobName}`);
  await bree.remove(jobName);

  // Set the interval to blank so next time this is added it will always add, even if the old interval was the same
  definition.interval = "";
}

async function addJob(name: JobName, interval: string) {
  const definition = jobs.get(name);

  if (!definition) {
    logger.debug(`Unable to create job ${name}: no definition found.`);
    return null;
  }

  if (definition.interval === interval) {
    logger.debug(`${name} is already running with interval ${interval}`);
    return;
  }

  logger.debug(`Adding ${name} with interval ${interval}`);
  definition.interval = interval;
  await bree.add({
    ...definition.options,
    name,
    interval,
  });
  await bree.start(name);
}

export async function setVatsimDataUpdateInterval(interval: string) {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  if (jobs.get(JobName.GetVatsimData)?.interval === interval) {
    logger.debug(`${JobName.GetVatsimData} is already running every ${interval}`);
    return;
  }

  logger.info(`Setting ${JobName.GetVatsimData} updates to ${interval}`);
  await deleteJob(JobName.GetVatsimData);
  await addJob(JobName.GetVatsimData, interval);
}

export function initialize() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  addJob(JobName.GetVatsimData, ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS);
  addJob(JobName.GetVatsimEndpoints, "every 24 hours");
  addJob(JobName.GetVatsimTransceivers, "every 1 hour");
  addJob(JobName.ImportAirports, ENV.AIRPORT_INFO_AUTO_UPDATE_INTERVAL);
}

export async function start() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  await bree.start();
}

export async function stop() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  await bree.stop();
}
