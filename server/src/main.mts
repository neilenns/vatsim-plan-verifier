import debug from "debug";
import { ENV } from "./env.mjs";

import * as db from "./database.mjs";
import * as WebServer from "./server.mjs";

// If startup fails restart is reattempted 5 times every 30 seconds.
const restartAttemptWaitTime = 30 * 1000;
const maxRestartAttempts = 5;
let restartAttemptCount = 0;
let restartTimer: NodeJS.Timeout;

const logger = debug("plan-verifier:main");

async function startup() {
  try {
    await db.connectToDatabase();
    await WebServer.startServer(ENV.PORT);

    // At this point startup succeeded so reset the restart count. This is in case
    // later hot reloads cause something to break, it should still support multiple
    // restarts.
    restartAttemptCount = 0;
  } catch (err) {
    logger(`Error starting server: ${err}`);

    // Shutdown things that may have spun up successfully.
    await shutdown();

    restartAttemptCount++;

    // Try starting again in a little bit.
    if (restartAttemptCount < maxRestartAttempts) {
      logger(
        `Startup reattempt ${restartAttemptCount} of ${maxRestartAttempts} in ${
          restartAttemptWaitTime / 1000
        } seconds.`
      );
      restartTimer = setTimeout(startup, restartAttemptWaitTime);
    } else {
      logger(`Startup failed ${maxRestartAttempts} times. Giving up.`);
      return;
    }
  }
}

async function shutdown() {
  logger("Shutting down...");
  clearTimeout(restartTimer);
  await WebServer.stopServer();
  await db.disconnectFromDatabase();
  logger("Shutdown complete.");
}

async function handleDeath() {
  await shutdown();
  process.exit();
}

function registerForDeath(): void {
  process.on("SIGINT", handleDeath);
  process.on("SIGTERM", handleDeath);
  process.on("SIGQUIT", handleDeath);
  process.on("SIGBREAK", handleDeath);
}

registerForDeath();

startup();
