import express from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import passport from "passport";
import { createHttpTerminator, HttpTerminator } from "http-terminator";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// Authentication
import "./jwtStrategy.mjs";
import "./LocalStrategy.mjs";
import "./authenticate.mjs";

// Routes
import defaultRouter from "./routes/default.mjs";
import flightPlan from "./routes/flightPlan.mjs";
import flightAwareRouter from "./routes/flightAware.mjs";
import aircraftRouter from "./routes/aircraft.mjs";
import airlineRouter from "./routes/airline.mjs";
import magneticDeclinationRouter from "./routes/magneticDeclination.mjs";
import verifyRouter from "./routes/verify.mjs";
import preferredRoutesRouter from "./routes/preferredRoutes.mjs";
import activeFlightPlansRouter from "./routes/activeFlightPlans.mjs";
import userRouter from "./routes/user.mjs";

import https from "https";
import debug from "debug";

// Authentication
import { Server } from "http";
import { ENV } from "./env.mjs";

export const app = express();
let server: https.Server | Server;
let httpTerminator: HttpTerminator;

const logger = debug("access-code-map:server");

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
