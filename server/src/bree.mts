import Bree from "bree";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import { publishUpdates } from "./services/vatsim.mjs";

const logger = mainLogger.child({ service: "jobs" });
const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: process.env.TS_NODE ? "mts" : "mjs",
  logger,
  doRootCheck: false,
  jobs: [],
  errorHandler: (error, workerMetadata) => {
    logger.error(`Error running worker ${workerMetadata.name}: ${error}`, error);
  },
  workerMessageHandler: async ({ name, message }) => {
    if (message === "sendUpdates") {
      await publishUpdates();
    }
  },
})
  .on("worker created", (name) => {
    logger.debug(`Worker created: ${name}`);
    const jobsRunning = bree.config.jobs.map((j: { name: string }) => j.name).join(", ");
    const workers = Array.from(bree.workers.keys()).join(", ");
    logger.debug(`Current jobs: ${jobsRunning}`);
    logger.debug(`Current workers: ${workers}`);
  })
  .on("worker deleted", (name) => {
    logger.debug(`Worker deleted: ${name}`);
    const jobsRunning = bree.config.jobs.map((j: { name: string }) => j.name).join(", ");
    const workers = Array.from(bree.workers.keys()).join(", ");
    logger.debug(`Current jobs: ${jobsRunning}`);
    logger.debug(`Current workers: ${workers}`);
  });

export enum JobName {
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

export async function runJob(jobName: JobName) {
  const definition = jobs.get(jobName);

  // This should never happen
  if (!definition) {
    logger.debug(`Unable to start job ${jobName}: no definition found.`);
    return null;
  }

  // If the job doesn't exist (because it's in the never state) add it first.
  if (!bree.config.jobs.some((job) => job.name === jobName)) {
    await bree.add(jobName);
  }

  // Force the job to run
  bree.run(jobName);
}

async function deleteJob(jobName: JobName) {
  const definition = jobs.get(jobName);

  // This should never happen
  if (!definition) {
    logger.debug(`Unable to remove job ${jobName}: no definition found.`);
    return null;
  }

  if (definition.interval === "never") {
    logger.debug(`Job ${jobName} doesn't exist, skipping removal.`);
    return;
  }

  logger.debug(`Removing job ${jobName}`);
  try {
    await bree.remove(jobName);
  } catch (error) {
    const err = error as Error;
    logger.error(`Unable to remove job ${jobName}: ${err.message}`, error);
    return;
  } finally {
    // Set the interval to blank so next time this is added it will always add, even if the old interval was the same
    definition.interval = "";
  }
}

async function addJob(name: JobName, interval: string, start = true) {
  const definition = jobs.get(name);

  if (!definition) {
    logger.debug(`Unable to create job ${name}: no definition found.`);
    return null;
  }

  if (interval === "never") {
    definition.interval = interval;
    logger.debug(`${name} has an update interval of ${interval}, skipping creating it.`);
    return;
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

  if (start) {
    await bree.start(name);
  }
}

export async function setJobUpdateInterval(name: JobName, interval: string) {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  if (jobs.get(name)?.interval === interval) {
    logger.debug(`${name} is already running every ${interval}`);
    return;
  }

  logger.info(`Setting ${name} updates to ${interval}`);
  await deleteJob(name);
  await addJob(name, interval);
  logger.debug(`${name} updated to ${interval}`);
}

export async function initialize() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  logger.debug(`Initializing jobs`);
  await addJob(JobName.GetVatsimData, ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS, false);
  await addJob(JobName.GetVatsimEndpoints, "every 24 hours", false);
  await addJob(
    JobName.GetVatsimTransceivers,
    ENV.VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS,
    false
  );
  await addJob(JobName.ImportAirports, ENV.AIRPORT_INFO_AUTO_UPDATE_INTERVAL, false);
  logger.debug(`Jobs initialized`);
}

export async function start() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  logger.debug(`Starting jobs`);
  await bree.start();
  logger.debug(`Jobs started`);
}

export async function stop() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  logger.debug(`Stopping jobs`);
  await bree.stop();
  logger.debug(`Jobs stopped`);
}
