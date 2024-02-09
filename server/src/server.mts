import bodyParser from "body-parser";
import * as chokidar from "chokidar";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import fs, { read } from "fs";
import helmet from "helmet";
import { Server } from "http";
import { createHttpTerminator, HttpTerminator } from "http-terminator";
import https from "https";
import passport from "passport";
import * as bree from "./bree.mjs";
import { ENV } from "./env.mjs";
import mainLogger from "./logger.mjs";
import morgan from "./middleware/morgan.mjs";
import { setupSockets } from "./sockets/index.mjs";

const logger = mainLogger.child({ service: "server" });

// Workaround for lodash being a CommonJS module
import pkg from "lodash";
const { debounce } = pkg;

// Authentication
import "./authenticate.mjs";
import "./jwtStrategy.mjs";
import "./LocalStrategy.mjs";
import { verifyApiKey } from "./middleware/apikey.mjs";

// Routes
import activeFlightPlansRouter from "./routes/activeFlightPlans.mjs";
import aircraftRouter from "./routes/aircraft.mjs";
import airlineRouter from "./routes/airline.mjs";
import airportInfoRouter from "./routes/airportInfo.mjs";
import authenticationRouter from "./routes/authentication.mjs";
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
import vatsimFlightPlansRouter from "./routes/vatsim/flightPlans.mjs";
import vatsimPilotsRouter from "./routes/vatsim/pilots.mjs";
import vatsimTransceiversRouter from "./routes/vatsim/transceivers.mjs";

// Admin routes

import endConnections from "./routes/endConnections.mjs";
import { isOriginAllowed } from "./utils/cors.mjs";

export const app = express();
let server: https.Server | Server;
let httpTerminator: HttpTerminator;
var watcher: chokidar.FSWatcher;

const certFilesExist =
  ENV.SSL_FULL_CHAIN_PATH &&
  ENV.SSL_PRIVATE_KEY_PATH &&
  fs.existsSync(ENV.SSL_PRIVATE_KEY_PATH) &&
  fs.existsSync(ENV.SSL_FULL_CHAIN_PATH);

function reloadCertificates() {
  if (!certFilesExist) {
    return;
  }

  logger.info("Certificate files changed");
  if (server instanceof https.Server) {
    logger.info("Reloading SSL...");

    const certs = readCertsSync();

    if (!certs) {
      logger.error("Unable to load SSL certs.");
      return;
    }

    server.setSecureContext(certs);
    logger.info("SSL reload complete!");
  }
}

// From https://stackoverflow.com/a/42455876/9206264
const debouncedReloadSSL = debounce(reloadCertificates, 1000);

function readCertsSync() {
  if (!ENV.SSL_FULL_CHAIN_PATH || !ENV.SSL_PRIVATE_KEY_PATH) {
    return undefined;
  }
  return {
    key: fs.readFileSync(ENV.SSL_PRIVATE_KEY_PATH),
    cert: fs.readFileSync(ENV.SSL_FULL_CHAIN_PATH),
  };
}

export async function startServer(port: number): Promise<void> {
  app.set("trust proxy", ENV.TRUST_PROXY);
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser(ENV.COOKIE_SECRET));
  app.use(morgan);

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  } as CorsOptions;

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
  app.use(verifyApiKey);

  // Configure authentication
  app.use(passport.initialize());

  // Set up the routes
  app.use(activeFlightPlansRouter);
  app.use(aircraftRouter);
  app.use(airlineRouter);
  app.use(airportInfoRouter);
  app.use(authenticationRouter);
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

  // Verifier routes
  app.use(verifyRouter);

  // Admin routes
  app.use(endConnections);

  // Start up the server
  if (certFilesExist) {
    const certs = readCertsSync();
    if (!certs) {
      logger.error("Unable to load certs");
      return;
    }
    server = https.createServer(certs, app);
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
  setupSockets(server);

  // Start the jobs
  await bree.initialize();
  await bree.start();

  // With the server up and running start watching for SSL file changes.
  startWatching();
}

export async function stopServer() {
  stopWatching();
  await bree.stop();

  if (server) {
    logger.info("Stopping web server...");
    await httpTerminator.terminate();
  }
}

function startWatching() {
  if (!ENV.SSL_FULL_CHAIN_PATH || !ENV.SSL_PRIVATE_KEY_PATH) {
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

async function stopWatching() {
  await watcher?.close();
}
