import bodyParser from "body-parser";
import * as chokidar from "chokidar";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import debug from "debug";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import { Server } from "http";
import { createHttpTerminator, HttpTerminator } from "http-terminator";
import https from "https";
import passport from "passport";
import { ENV } from "./env.mjs";
import { startVatsimAutoUpdate, stopVatsimAutoUpdate } from "./services/vatsim.mjs";
import { setupSockets } from "./sockets/index.mjs";

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
import vatsimFlightPlansRouter from "./routes/vatsim/flightPlans.mjs";
import vatsimATISRouter from "./routes/vatsim/ATIS.mjs";
import vatsimPilotsRouter from "./routes/vatsim/pilots.mjs";
import vatsimTransceiversRouter from "./routes/vatsim/transceivers.mjs";

export const app = express();
let server: https.Server | Server;
let httpTerminator: HttpTerminator;
var watcher: chokidar.FSWatcher;

const logger = debug("plan-verifier:server");

const privateKeyPath = "/certs/privkey.pem";
const fullChainPath = "/certs/fullchain.pem";

const certFilesExist = fs.existsSync(privateKeyPath) && fs.existsSync(fullChainPath);

function reloadCertificates() {
  logger("Certificate files changed");
  if (server instanceof https.Server) {
    logger("Reloading SSL...");
    server.setSecureContext(readCertsSync());
    logger("SSL reload complete!");
  }
}

// From https://stackoverflow.com/a/42455876/9206264
const debouncedReloadSSL = debounce(reloadCertificates, 1000);

function readCertsSync() {
  return {
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(fullChainPath),
  };
}

export function startServer(port: number): void {
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser(ENV.COOKIE_SECRET));

  const whitelist = ENV.WHITELISTED_DOMAINS ? ENV.WHITELISTED_DOMAINS.split(",") : [];

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
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

  // Verifier routes
  app.use(verifyRouter);

  // Start up the server
  if (certFilesExist) {
    server = https.createServer(readCertsSync(), app);
    server.listen(port, () => {
      logger("Certificate files exist, using HTTPS");
      logger(`Listening on port ${port}`);
    });
  } else {
    server = app.listen(port, () => {
      logger(`Listening on port ${port}`);
    });
  }
  // Register a terminator to shut things down gracefully.
  httpTerminator = createHttpTerminator({
    server,
  });

  // Start the sockets
  const io = setupSockets(server);
  io.on("connection", (socket) => {
    // Increase the vatsim update interval to the max speed.
    startVatsimAutoUpdate(ENV.VATSIM_CONNECTIONS_AUTO_UPDATE_INTERVAL_MS, io);

    socket.on("disconnect", () => {
      // If the last client disconnected slow down the vatsim update interval
      if (io.sockets.sockets.size === 0) {
        logger(`No more connected clients, slowing down vatsim auto update.`);
        startVatsimAutoUpdate(ENV.VATSIM_NO_CONNECTIONS_AUTO_UPDATE_INTERVAL_MS, io);
      }
    });
  });

  // Start vatsim data auto-update at the slowest speed
  startVatsimAutoUpdate(ENV.VATSIM_NO_CONNECTIONS_AUTO_UPDATE_INTERVAL_MS, io);

  // With the server up and running start watching for SSL file changes.
  startWatching();
}

export async function stopServer() {
  stopWatching();
  stopVatsimAutoUpdate();
  if (server) {
    logger("Stopping web server...");
    await httpTerminator.terminate();
  }
}

function startWatching() {
  if (!certFilesExist) {
    return;
  }

  // Watch for changes to the certificate files. If they change, reload the SSL.
  // The debounced method is used to wait for changes to happen to both files
  // and only restart SSL once.
  watcher = chokidar
    .watch([fullChainPath, privateKeyPath], {
      awaitWriteFinish: true,
    })
    .on("change", debouncedReloadSSL);
  logger(`Watching for changes to ${fullChainPath} and ${privateKeyPath}`);
}

async function stopWatching() {
  await watcher?.close();
}
