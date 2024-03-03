import morgan from "morgan";
import mainLogger from "../logger.mjs";
import { ENV } from "../env.mjs";
import { type IncomingMessage } from "http";

const logger = mainLogger.child({ service: "server" });

const morganMiddleware = morgan(
  ENV.NODE_ENV === "production"
    ? "common"
    : // In non-production environments use the 'dev' format with the userid prepended.
      ":userid :method :url :status :response-time ms - :res[content-length]",
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);

// Adds a userid token to show how it is done, however this is not used in the log messages to avoid including
// data that can trace back to the user in the logs.
morgan.token("userid", function (req: IncomingMessage & Express.CustomRequest, res) {
  return req.user?._id;
});

export default morganMiddleware;
