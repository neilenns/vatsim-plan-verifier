import { type NextFunction, type Request, type Response } from "express";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "secureQueryMiddleware" });

function hasInjectionRisk(key: string, value: unknown): boolean {
  if (typeof value === "string" && value.startsWith("$")) {
    logger.warn(
      `Detected potential NoSQL injection in query parameter '${key}' with value '${value}'`
    );
    return true;
  }
  return false;
}

// Middleware function to check for potential NoSQL injection
export function secureQueryMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Iterate through all query parameters
  for (const key in req.params) {
    // eslint-disable-next-line security/detect-object-injection
    const value = req.params[key];

    if (hasInjectionRisk(key, value)) {
      res.status(400).json({ error: "Invalid parameter value: '$' is not allowed." });
      return;
    }
  }

  // Check the body
  for (const key in req.body) {
    // eslint-disable-next-line security/detect-object-injection
    const value = req.body[key];

    if (hasInjectionRisk(key, value)) {
      res.status(400).json({ error: "Invalid parameter value: '$' is not allowed." });
      return;
    }
  }

  // If no security issue, move on to the next middleware/handler
  next();
}
