import { NextFunction, Request, Response } from "express";
import { AuthResult, auth } from "express-oauth2-jwt-bearer";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";
import { Auth0UserModel } from "../models/Auth0User.mjs";
import { Types } from "mongoose";

const logger = mainLogger.child({ service: "permissions" });

export interface Auth0UserRequest extends Request {
  auth?: AuthResult;
}

type VerifyErrorResponse = {
  error: {
    isPending: boolean;
    message: string;
  };
};

export const verifyUser = auth({
  audience: ENV.AUTH0_AUDIENCE,
  issuerBaseURL: ENV.AUTH0_ISSUER_BASE_URL,
});

export const verifyAndAddUserInfo = (req: Auth0UserRequest, res: Response, next: NextFunction) => {
  // Call your existing authentication middleware
  auth({
    audience: ENV.AUTH0_AUDIENCE,
    issuerBaseURL: ENV.AUTH0_ISSUER_BASE_URL,
  })(req, res, async (err: any) => {
    if (err) {
      return next(err);
    }

    try {
      const sub = req.auth?.payload.sub;
      const user = await Auth0UserModel.findOne({ sub });

      logger.debug(`Auth: ${req.auth}`);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.auth) {
        // Replace the sub with the value from the database. Will this work?
        req.auth.payload.sub = user._id.toString();
      }

      next();
    } catch (error) {
      // Handle any errors that occur during user lookup
      logger.error("Error retrieving user information:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const dumpJwt = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.headers.authorization);
  return next();
};

export const verifyRole =
  (role: string) => async (req: Auth0UserRequest, res: Response, next: NextFunction) => {
    const sub = req.auth?.payload.sub;

    if (!sub) {
      return res.status(401).json({ error: { message: "Unauthorized" } } as VerifyErrorResponse);
    }

    const userInfo = await Auth0UserModel.findOrCreate(sub);

    if (!userInfo) {
      return res.status(401).json({ error: { message: "Unauthorized" } } as VerifyErrorResponse);
    }

    if (userInfo.isPending) {
      return res.status(403).json({
        error: { isPending: true, message: "Account not verified" },
      } as VerifyErrorResponse);
    } else if (!userInfo.roles.includes(role)) {
      return res.status(403).json({ error: { message: "Unauthorized" } } as VerifyErrorResponse);
    }

    return next();
  };
