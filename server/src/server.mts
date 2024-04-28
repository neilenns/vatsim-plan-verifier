import bodyParser from "body-parser";
import * as chokidar from "chokidar";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import { type Server } from "http";
import { createHttpTerminator, type HttpTerminator } from "http-terminator";
import https from "https";
import _ from "lodash";
import * as bree from "./bree.mjs";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import morgan from "./middleware/morgan.mjs";
import { setupSockets } from "./sockets/index.mjs";

// Authentication

// Routes
import activeFlightPlansRouter from "./routes/activeFlightPlans.mjs";
import aircraftRouter from "./routes/aircraft.mjs";
import airlineRouter from "./routes/airline.mjs";
import airportInfoRouter from "./routes/airportInfo.mjs";
import defaultRouter from "./routes/default.mjs";
import departureRouter from "./routes/departure.mjs";
import extendedAirportInfoRouter from "./routes/extendedAirportInfo.mjs";
import flightAwareRouter from "./routes/flightAware.mjs";
import flightPlan from "./routes/flightPlan.mjs";
import magneticDeclinationRouter from "./routes/magneticDeclination.mjs";
import metarRouter from "./routes/metar.mjs";
import navaidRouter from "./routes/navaid.mjs";
import preferredRoutesRouter from "./routes/preferredRoutes.mjs";
import quickReferenceRouter from "./routes/quickReference.mjs";
import userRouter from "./routes/users.mjs";
import verifyRouter from "./routes/verify.mjs";

// Vatsim routes
import vatsimATISRouter from "./routes/vatsim/ATIS.mjs";
import vatsimEDCTRouter from "./routes/vatsim/EDCT.mjs";
import vatsimControllersRouter from "./routes/vatsim/controllers.mjs";
import vatsimFlightPlansRouter from "./routes/vatsim/flightPlans.mjs";
import vatsimPilotsRouter from "./routes/vatsim/pilots.mjs";
import vatsimTransceiversRouter from "./routes/vatsim/transceivers.mjs";

// Admin routes
import adminRouter from "./routes/admin.mjs";

import { isOriginAllowed, setWhitelist } from "./utils/cors.mjs";

const logger = mainLogger.child({ service: "server" });

export const app = express();
let server: https.Server | Server;
let httpTerminator: HttpTerminator;
let watcher: chokidar.FSWatcher;

const certFilesExist =
  // This is fine, they come from environment variables not user-provided strings
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.existsSync(ENV.SSL_PRIVATE_KEY_PATH) && fs.existsSync(ENV.SSL_FULL_CHAIN_PATH);

function reloadCertificates(): void {
  if (!certFilesExist) {
    return;
  }

  logger.info("Certificate files changed");
  if (server instanceof https.Server) {
    logger.info("Reloading SSL...");

    const certs = readCertsSync();

    if (certs.key == null || certs.cert == null) {
      logger.error("Unable to load SSL certs.");
      return;
    }

    server.setSecureContext(certs);
    logger.info("SSL reload complete!");
  }
}

// From https://stackoverflow.com/a/42455876/9206264
const debouncedReloadSSL = _.debounce(reloadCertificates, 1000);

function readCertsSync(): { key: Buffer; cert: Buffer } {
  return {
    // Both these paths come from environment variables, not user supplied data. Should be fine.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    key: fs.readFileSync(ENV.SSL_PRIVATE_KEY_PATH),
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    cert: fs.readFileSync(ENV.SSL_FULL_CHAIN_PATH),
  };
}

export async function startServer(port: number): Promise<void> {
  setWhitelist(ENV.WHITELISTED_DOMAINS);

  app.set("trust proxy", ENV.TRUST_PROXY);
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser(ENV.COOKIE_SECRET));
  app.use(morgan);

  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (origin == null || isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  const rateLimiter = rateLimit({
    windowMs: ENV.API_RATE_LIMIT_MINUTE_WINDOW * 60 * 1000, // 5 minute default
    max: ENV.API_RATE_LIMIT_MAX, // Limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Security
  app.use(cors(corsOptions));
  app.use(rateLimiter);
  app.use(helmet());

  // Set up the routes
  app.use(activeFlightPlansRouter);
  app.use(aircraftRouter);
  app.use(airlineRouter);
  app.use(airportInfoRouter);
  app.use(defaultRouter);
  app.use(extendedAirportInfoRouter);
  app.use(flightAwareRouter);
  app.use(flightPlan);
  app.use(magneticDeclinationRouter);
  app.use(navaidRouter);
  app.use(preferredRoutesRouter);
  app.use(quickReferenceRouter);
  app.use(userRouter);
  app.use(metarRouter);
  app.use(departureRouter);

  // Vatsim routes
  app.use(vatsimATISRouter);
  app.use(vatsimFlightPlansRouter);
  app.use(vatsimPilotsRouter);
  app.use(vatsimTransceiversRouter);
  app.use(vatsimEDCTRouter);
  app.use(vatsimControllersRouter);

  // Verifier routes
  app.use(verifyRouter);

  // Admin routes
  app.use(adminRouter);

  // Overall error handler
  app.use((err: any, req: any, res: any, next: any) => {
    logger.error(err);
    res.status(err.status ?? 500).send({
      error: {
        message: err.message,
      },
    });
  });

  // Start up the server
  if (certFilesExist) {
    server = https.createServer(readCertsSync(), app);
    server.listen(port, () => {
      logger.debug("Certificate files exist, using HTTPS");
      logger.info(`Listening on port ${port}`);
    });
  } else {
    server = app.listen(port, () => {
      logger.info(`Listening on port ${port}`);
    });
  }
  // Register a terminator to shut things down gracefully.
  httpTerminator = createHttpTerminator({
    server,
  });

  // Start the sockets
  await setupSockets(server);

  // Start the jobs
  await bree.initialize();
  await bree.start();

  // With the server up and running start watching for SSL file changes.
  startWatching();
}

export async function stopServer(): Promise<void> {
  await stopWatching();
  await bree.stop();

  logger.info("Stopping web server...");
  await httpTerminator.terminate();
}

function startWatching(): void {
  if (!certFilesExist) {
    return;
  }

  // Watch for changes to the certificate files. If they change, reload the SSL.
  // The debounced method is used to wait for changes to happen to both files
  // and only restart SSL once.
  watcher = chokidar
    .watch([ENV.SSL_FULL_CHAIN_PATH, ENV.SSL_PRIVATE_KEY_PATH], {
      awaitWriteFinish: true,
    })
    .on("change", debouncedReloadSSL);
  logger.debug(
    `Watching for changes to ${ENV.SSL_FULL_CHAIN_PATH} and ${ENV.SSL_PRIVATE_KEY_PATH}`
  );
}

async function stopWatching(): Promise<void> {
  await watcher?.close();
}
