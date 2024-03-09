import fs from "fs";
import path from "node:path";
import * as db from "./database.mjs";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import * as WebServer from "./server.mjs";

const logger = mainLogger.child({ service: "main" });

// If startup fails restart is reattempted 5 times every 30 seconds.
const restartAttemptWaitTime = 30 * 1000;
const maxRestartAttempts = 5;
let restartAttemptCount = 0;
let restartTimer: NodeJS.Timeout;

async function startup(): Promise<void> {
  try {
    logger.info(`Plan verifier ${ENV.VERSION} starting`);
    // Clean up any stray lock file that may have been left behind by a prior
    // run of the service.
    const lockfilePath = path.resolve("airports.lock");
    if (fs.existsSync(lockfilePath)) {
      fs.rmdir(lockfilePath, (err) => {
        if (err == null) {
          logger.warn(`Removed left behind ${lockfilePath} lockfile`);
        }
      });
    }
    await db.connectToDatabase();
    await WebServer.startServer(ENV.PORT);

    // At this point startup succeeded so reset the restart count. This is in case
    // later hot reloads cause something to break, it should still support multiple
    // restarts.
    restartAttemptCount = 0;
  } catch (err) {
    const error = err as Error;
    logger.error(`Error starting server: ${error.message}`, error);

    // Shutdown things that may have spun up successfully.
    await shutdown();

    restartAttemptCount++;

    // Try starting again in a little bit.
    if (restartAttemptCount < maxRestartAttempts) {
      logger.info(
        `Startup reattempt ${restartAttemptCount} of ${maxRestartAttempts} in ${
          restartAttemptWaitTime / 1000
        } seconds.`
      );
      restartTimer = setTimeout(() => {
        void (async () => {
          await startup();
        })();
      }, restartAttemptWaitTime);
    } else {
      logger.error(`Startup failed ${maxRestartAttempts} times. Giving up.`);
    }
  }
}

async function shutdown(): Promise<void> {
  logger.debug("Shutting down...");
  clearTimeout(restartTimer);
  await WebServer.stopServer();
  await db.disconnectFromDatabase();
  logger.debug("Shutdown complete.");
}

async function handleDeath(): Promise<void> {
  await shutdown();
  process.exit();
}

function registerForDeath(): void {
  process.on("SIGINT", () => {
    void (async () => {
      await handleDeath();
    })();
  });
  process.on("SIGTERM", () => {
    void (async () => {
      await handleDeath();
    })();
  });
  process.on("SIGQUIT", () => {
    void (async () => {
      await handleDeath();
    })();
  });
  process.on("SIGBREAK", () => {
    void (async () => {
      await handleDeath();
    })();
  });
}

registerForDeath();

await startup();
