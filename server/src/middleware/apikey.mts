import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ApiKeyModel } from "../models/ApiKey.mjs";

// Verifies that a valid api key was provided in the web request. This gets
// used on all routes on the server.
export const verifyApiKey = async function (req: Request, res: Response, next: NextFunction) {
  try {
    // Get the API key from the request headers
    const apiKey = req.headers["x-api-key"] || req.query["x-api-key"];

    // Check if the API key exists in the database and is active
    const apiKeyDoc = await ApiKeyModel.findOne({ _id: apiKey, isActive: true }).cacheQuery();

    if (!apiKeyDoc) {
      return res.status(401).json({ error: "Unauthorized - Invalid API key" });
    }

    // If the API key is valid, proceed to the next middleware
    next();
  } catch (error) {
    // Handle any errors that occur during the verification process
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifySocketApiKey = async function (socket: Socket, next: any) {
  try {
    // Get the API key from the request headers
    const apiKey = socket.handshake.auth.token;

    // Check if the API key exists in the database and is active
    const apiKeyDoc = await ApiKeyModel.findOne({ _id: apiKey, isActive: true }).cacheQuery();
    if (!apiKeyDoc) {
      const err = new Error("Unauthorized - Invalid API key");
      next(err);
    }
  } catch (error) {
    const err = new Error("Unauthroized - Unable to verify API key");
    next(err);
  }

  next();
};
