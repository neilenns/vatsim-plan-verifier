import bodyParser from "body-parser";
import * as chokidar from "chokidar";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import debug from "debug";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import { Server } from "http";
import { createHttpTerminator, HttpTerminator } from "http-terminator";
import https from "https";
import passport from "passport";
import { ENV } from "./env.mjs";

// Workaround for lodash being a CommonJS module
import pkg from "lodash";
const { debounce } = pkg;

// Authentication
import "./authenticate.mjs";
import "./jwtStrategy.mjs";
import "./LocalStrategy.mjs";

// Routes
import activeFlightPlansRouter from "./routes/activeFlightPlans.mjs";
import aircraftRouter from "./routes/aircraft.mjs";
import airlineRouter from "./routes/airline.mjs";
import defaultRouter from "./routes/default.mjs";
import flightAwareRouter from "./routes/flightAware.mjs";
import flightPlan from "./routes/flightPlan.mjs";
import magneticDeclinationRouter from "./routes/magneticDeclination.mjs";
import preferredRoutesRouter from "./routes/preferredRoutes.mjs";
import userRouter from "./routes/user.mjs";
import verifyRouter from "./routes/verify.mjs";
import apiKey from "./middleware/apikey.mjs";

export const app = express();
let server: https.Server | Server;
let httpTerminator: HttpTerminator;
var watcher: chokidar.FSWatcher;

const logger = debug("plan-verifier:server");

const privateKeyPath = "/certs/privkey.pem";
const fullChainPath = "/certs/fullchain.pem";

const certFilesExist = fs.existsSync(privateKeyPath) && fs.existsSync(fullChainPath);

function reloadCertificates() {
  console.log("Certificate files changed");
  if (server instanceof https.Server) {
    console.log("Reloading SSL...");
    server.setSecureContext(readCertsSync());
    console.log("SSL reload complete!");
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
  app.use(apiKey);

  // Configure authentication
  app.use(passport.initialize());

  // Set up the routes
  app.use(defaultRouter);
  app.use(flightPlan);
  app.use(flightAwareRouter);
  app.use(aircraftRouter);
  app.use(airlineRouter);
  app.use(magneticDeclinationRouter);
  app.use(preferredRoutesRouter);
  app.use(activeFlightPlansRouter);
  app.use(userRouter);

  // Verifier routes
  app.use(verifyRouter);

  // Start up the server
  if (certFilesExist) {
    server = https.createServer(readCertsSync(), app);
    server.listen(port, () => {
      console.log("Certificate files exist, using HTTPS");
      console.log(`Listening on port ${port}`);
      logger(`Listening on port ${port}`);
    });
  } else {
    server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      logger(`Listening on port ${port}`);
    });
  }
  // Register a terminator to shut things down gracefully.
  httpTerminator = createHttpTerminator({
    server,
  });
}

// With the server up and running start watching for SSL file changes.
startWatching();

export async function stopServer() {
  if (server) {
    console.log("Stopping web server...");
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
  console.log(`Watching for changes to ${fullChainPath} and ${privateKeyPath}`);
}

async function stopWatching() {
  await watcher?.close();
}
