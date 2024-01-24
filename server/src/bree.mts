import Bree from "bree";
import path from "path";
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

class JobRunner {
  runner: Bree | null = null;
  interval: string = "";
  options: Partial<Bree.JobOptions> | null = null;
}

const jobDefinitions = new Map<JobName, Partial<JobRunner>>();

jobDefinitions.set(JobName.GetVatsimData, {
  options: {
    timeout: "10 seconds",
  },
});
jobDefinitions.set(JobName.GetVatsimEndpoints, {
  options: {
    timeout: 0,
  },
});
jobDefinitions.set(JobName.ImportAirports, {
  options: {
    timeout: false, // Don't start this until its first scheduled instance
  },
});
jobDefinitions.set(JobName.GetVatsimTransceivers, {
  options: {
    timeout: "15 seconds",
  },
});

async function deleteBree(jobName: JobName) {
  if (!jobDefinitions.has(jobName)) {
    logger.debug(`Unable to delete job ${jobName}: no definition found.`);
    return null;
  }

  const definition = jobDefinitions.get(jobName);

  // This should never happen
  if (!definition) {
    logger.debug(`Unable to delete job ${jobName}: no definition found.`);
    return null;
  }

  await definition.runner?.stop();
  definition.runner = null;
}

function createBree(jobName: JobName, interval: string): Bree | null {
  const definition = jobDefinitions.get(jobName);

  if (!definition) {
    logger.debug(`Unable to create job ${jobName}: no definition found.`);
    return null;
  }

  definition.interval = interval;
  definition.runner = new Bree({
    root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
    defaultExtension: process.env.TS_NODE ? "mts" : "mjs",
    logger,
    jobs: [
      {
        name: jobName,
        interval,
        ...definition.options,
      },
    ],
    errorHandler: (error, workerMetadata) => {
      logger.error(`Error running worker ${workerMetadata.name}: ${error}`);
    },
    workerMessageHandler: async ({ name, message }) => {
      if (message === "sendUpdates") {
        await publishUpdates();
      }
    },
  })
    .on("worker created", (name) => {
      logger.debug(`Worker created: ${name}`);
    })
    .on("worker deleted", (name) => {
      logger.debug(`Worker deleted: ${name}`);
    });

  return definition.runner;
}

export async function setVatsimDataUpdateInterval(interval: string) {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  if (jobDefinitions.get(JobName.GetVatsimData)?.interval === interval) {
    logger.debug(`${JobName.GetVatsimData} is already running every ${interval}`);
  }
  logger.info(`Setting ${JobName.GetVatsimData} updates to ${interval}`);
  await deleteBree(JobName.GetVatsimData);
  await createBree(JobName.GetVatsimData, interval)?.start();
}

export function initialize() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  createBree(JobName.GetVatsimData, ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS);
  createBree(JobName.GetVatsimEndpoints, "every 24 hours");
  createBree(JobName.GetVatsimTransceivers, "every 1 hour");
  createBree(JobName.ImportAirports, ENV.AIRPORT_INFO_AUTO_UPDATE_INTERVAL);
}

export async function start() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  const promises = Array.from(jobDefinitions.values()).map(async (value) => {
    await value.runner?.start();
  });
  await Promise.all(promises);
}

export async function stop() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  const promises = Array.from(jobDefinitions.values()).map(async (value) => {
    await (value.runner?.stop() ?? Promise.resolve());
  });
  await Promise.all(promises);
}
