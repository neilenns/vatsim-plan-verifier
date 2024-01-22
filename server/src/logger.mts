// A lot of this was inspired by https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import winston from "winston";
import { ENV } from "./env.mjs";

let logtail: Logtail;

// This way of extending the logger to support a .trace() function
// comes from https://github.com/winstonjs/winston/issues/1523#issuecomment-436365549
export interface CustomLevelsLogger extends winston.Logger {
  trace: winston.LeveledLogMethod;
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5,
};

const level = () => {
  if (ENV.LOG_LEVEL) {
    return ENV.LOG_LEVEL;
  }

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
const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => {
    let message = "";
    if (info.durationMs) {
      message = `${info.message} (${Math.floor(info.durationMs / 1000)} seconds)`;
    } else {
      message = `${info.message}`;
    }
    // This method of applying colour comes from https://stackoverflow.com/a/63104828
    return `${info.timestamp} [${info.service}] ${winston.format
      .colorize()
      .colorize(info.level, message)}`;
  })
);

const Logger = winston.createLogger({
  level: level(),
  levels,
  transports: [new winston.transports.Console({ format: consoleFormat })],
}) as CustomLevelsLogger;

// If logtail was configured add it as a transport
if (ENV.LOGTAIL_TOKEN) {
  Logger.info(`Enabling logging to Logtail`, { service: "logging" });
  logtail = new Logtail(ENV.LOGTAIL_TOKEN);
  Logger.add(new LogtailTransport(logtail, { format: winston.format.json() }));
} else {
  Logger.info(`Logtail logging not configured`, { service: "logging" });
}

export async function flush() {
  if (logtail) {
    await logtail.flush();
  }
}
export default Logger;
