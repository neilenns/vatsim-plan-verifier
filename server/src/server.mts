import express from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import { createHttpTerminator, HttpTerminator } from "http-terminator";

// Routes
import defaultRouter from "./routes/default.mjs";
import flightPlan from "./routes/flightPlan.mjs";
import flightAwareRouter from "./routes/flightAware.mjs";
import aircraftRouter from "./routes/aircraft.mjs";
import airlineRouter from "./routes/airline.mjs";

import https from "https";
import debug from "debug";

// Authentication
import { Server } from "http";

const app = express();
var server: https.Server | Server;
var httpTerminator: HttpTerminator;

const logger = debug("access-code-map:server");
const port = process.env.PORT || 4001;

export function startServer(): void {
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

  app.use(cors(corsOptions));

  // Set up the routes
  app.use(defaultRouter);
  app.use(flightPlan);
  app.use(flightAwareRouter);
  app.use(aircraftRouter);
  app.use(airlineRouter);

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
