// React router middleware for checking permissions on routes
// based on the request type (GET, PUT, POST, DELETE, etc.)
// and the user's permissions in the mongo database.

// Import the User model
import { NextFunction, Request, Response } from "express";
import { JWTPayload, auth } from "express-oauth2-jwt-bearer";
import passport from "passport";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "authentication" });

interface JWTPayloadWithRoles extends JWTPayload {
  "https://my-app.example.com/roles"?: string[];
}

export const verifyApiAccess = auth({
  audience: ENV.AUTH0_AUDIENCE,
  issuerBaseURL: ENV.AUTH0_ISSUER_BASE_URL,
});

export const verifyApiRole =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.auth?.payload as JWTPayloadWithRoles;

    if (payload?.["https://my-app.example.com/roles"]?.includes(role)) {
      return next();
    } else {
      res.status(403).send("Unauthorized");
    }
  };

export const verifyUser = passport.authenticate("jwt", { session: false });
