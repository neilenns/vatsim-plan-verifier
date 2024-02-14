import { NextFunction, Request, Response } from "express";
import { auth, AuthResult } from "express-oauth2-jwt-bearer";
import passport from "passport";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";
import { Auth0UserModel } from "../models/Auth0User.mjs";
import { ManagementClient } from "auth0";

const logger = mainLogger.child({ service: "authentication" });

export interface Auth0UserRequest extends Request {
  auth?: AuthResult;
}

export const verifyApiAccess = auth({
  audience: ENV.AUTH0_AUDIENCE,
  issuerBaseURL: ENV.AUTH0_ISSUER_BASE_URL,
});

type VerifyErrorResponse = {
  error: {
    isPending: boolean;
    message: string;
  };
};

export const verifyApiRole =
  (role: string) => async (req: Auth0UserRequest, res: Response, next: NextFunction) => {
    const sub = req.auth?.payload.sub;

    if (!sub) {
      return res.status(401).send("Unauthorized");
    }

    // Check and see if the user already exists in the database
    let existingUser = await Auth0UserModel.findOne({ sub });

    // If there's no existing user it means they signed up but haven't been created on the backend yet. Fetch
    // their email address to store in the DB then create a new record.
    if (!existingUser) {
      const management = new ManagementClient({
        domain: ENV.AUTH0_DOMAIN,
        clientId: ENV.AUTH0_CLIENT_ID,
        clientSecret: ENV.AUTH0_CLIENT_SECRET,
      });

      const result = await management.users.get({ id: sub });

      if (!result) {
        return res.status(401).send({ error: { message: "Unauthorized" } } as VerifyErrorResponse);
      }

      existingUser = await new Auth0UserModel({
        sub,
        email: result.data.email,
        isPending: true,
      }).save();

      logger.debug(`Stored new user ${sub}`);
    }

    if (existingUser.isPending) {
      return res.status(403).send({
        error: { isPending: true, message: "Account not verified" },
      } as VerifyErrorResponse);
    } else if (!existingUser.roles.includes(role)) {
      return res.status(403).send({ error: { message: "Unauthorized" } } as VerifyErrorResponse);
    }

    return next();
  };

export const verifyUser = passport.authenticate("jwt", { session: false });
