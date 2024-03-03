import { type NextFunction, type Request, type Response } from "express";
import { type Socket } from "socket.io";
import mainLogger from "../logger.mjs";
import { ApiKeyModel } from "../models/ApiKey.mjs";

const logger = mainLogger.child({ service: "apikey" });

// Verifies that a valid api key was provided in the web request. This gets
// used on all routes on the server.
export const verifyApiKey = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get the API key from the request headers
    const apiKey = req.headers["x-api-key"] != null || req.query["x-api-key"];

    // Check if the API key exists in the database and is active
    const apiKeyDoc = await ApiKeyModel.findOne({ _id: apiKey, isActive: true }).cacheQuery();

    if (apiKeyDoc == null) {
      logger.error(`Invalid API key: ${apiKey as string}`);
      res.status(401).json({ error: "Unauthorized - Invalid API key" });
      return;
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Unable to verify API key: ${error.message}`, error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  next();
};

export const verifySocketApiKey = async function (socket: Socket, next: any): Promise<void> {
  try {
    // Get the API key from the request headers
    const apiKey = socket.handshake.auth.token;

    // Check if the API key exists in the database and is active
    const apiKeyDoc = await ApiKeyModel.findOne({ _id: apiKey, isActive: true }).cacheQuery();
    if (apiKeyDoc == null) {
      logger.error(`Invalid API key: ${apiKey}`);
      const err = new Error("Unauthorized - Invalid API key");
      next(err);
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Unable to verify API key: ${error.message}`, error);
    next(new Error("Unauthroized - Unable to verify API key"));
  }

  next();
};
