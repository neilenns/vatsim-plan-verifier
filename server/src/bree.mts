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

class JobRunner {
  runner: Bree | null = null;
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
    timeout: "24 hours",
  },
});
jobDefinitions.set(JobName.GetVatsimTransceivers, {
  options: {
    timeout: "10 seconds",
  },
});

let io: SocketIOServer;
let vatsimDataBree: Bree;

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
  jobDefinitions.delete(jobName);
}

function createBree(jobName: JobName, interval: string): Bree | null {
  if (!jobDefinitions.has(jobName)) {
    logger.debug(`Unable to create job ${jobName}: no definition found.`);
    return null;
  }

  const definition = jobDefinitions.get(jobName);

  // This should never happen
  if (!definition) {
    logger.debug(`Unable to create job ${jobName}: no definition found.`);
    return null;
  }

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

  return definition.runner;
}

export async function setVatsimDataUpdateInterval(interval: string) {
  if (!vatsimDataBree) {
    return;
  }

  logger.info(`Setting VATSIM data updates to ${interval}`);
  deleteBree(JobName.GetVatsimData);
  await createBree(JobName.GetVatsimData, interval)?.start();
}

export function initialize() {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  createBree(JobName.GetVatsimData, ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS);
  createBree(JobName.GetVatsimEndpoints, "every 24 hours");
  createBree(JobName.GetVatsimTransceivers, "every 1 hour");
  createBree(JobName.ImportAirports, "every 24 hours");
}

export async function start(ioInstance: SocketIOServer) {
  if (ENV.NODE_ENV === "test") {
    return;
  }

  io = ioInstance;

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
