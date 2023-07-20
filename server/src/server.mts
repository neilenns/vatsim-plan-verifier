import express from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import { createHttpTerminator, HttpTerminator } from "http-terminator";
import rateLimit from "express-rate-limit";

// Routes
import defaultRouter from "./routes/default.mjs";
import flightPlan from "./routes/flightPlan.mjs";
import flightAwareRouter from "./routes/flightAware.mjs";
import aircraftRouter from "./routes/aircraft.mjs";
import airlineRouter from "./routes/airline.mjs";
import magneticDeclinationRouter from "./routes/magneticDeclination.mjs";
import verifyRouter from "./routes/verify.mjs";
import preferredRoutesRouter from "./routes/preferredRoutes.mjs";

import https from "https";
import debug from "debug";

// Authentication
import { Server } from "http";

export const app = express();
var server: https.Server | Server;
var httpTerminator: HttpTerminator;

const rateLimitWindow = process?.env?.API_RATE_LIMIT_MINUTE_WINDOW
  ? parseInt(process.env.API_RATE_LIMIT_MINUTE_WINDOW) ?? 5
  : 5;

const rateLimitMax = process?.env?.API_RATE_LIMIT_MAX
  ? parseInt(process.env.API_RATE_LIMIT_MAX) ?? 100
  : 100;

const logger = debug("access-code-map:server");

export function startServer(port: number): void {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : [];

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
    windowMs: rateLimitWindow * 60 * 1000, // 5 minute default
    max: rateLimitMax, // Limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Security
  app.use(cors(corsOptions));
  app.use(rateLimiter);

  // Set up the routes
  app.use(defaultRouter);
  app.use(flightPlan);
  app.use(flightAwareRouter);
  app.use(aircraftRouter);
  app.use(airlineRouter);
  app.use(magneticDeclinationRouter);
  app.use(preferredRoutesRouter);

  // Verifier routes
  app.use(verifyRouter);

  server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    logger(`Listening on port ${port}`);
  });

  // Register a terminator to shut things down gracefully.
  httpTerminator = createHttpTerminator({
    server,
  });
}

export async function stopServer() {
  if (server) {
    console.log("Stopping web server...");
    await httpTerminator.terminate();
  }
}
