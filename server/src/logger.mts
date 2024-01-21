// A lot of this was inspired by https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import winston from "winston";
import { ENV } from "./env.mjs";

const logtail = new Logtail(ENV.LOGTAIL_TOKEN);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return ENV.NODE_ENV === "development" ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// const format = winston.format.combine(winston.format.timestamp(), winston.format.json());
// const format = winston.format.combine(winston.format.timestamp(), winston.format.cli());
const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `[${info.service}] ${info.message}`)
);

const transports = [
  new winston.transports.Console({ format }),
  new LogtailTransport(logtail, { format: winston.format.json() }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.json(),
  transports,
});

export default Logger;
