import winston from "winston";
import { ENV } from "./env.mjs";

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

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
