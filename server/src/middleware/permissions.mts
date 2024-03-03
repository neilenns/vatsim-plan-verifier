import { type NextFunction, type Request, type Response } from "express";
import { type AuthResult, auth } from "express-oauth2-jwt-bearer";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";
import { Auth0UserModel } from "../models/Auth0User.mjs";

const logger = mainLogger.child({ service: "permissions" });

export interface Auth0UserRequest extends Request {
  auth?: AuthResult;
}

interface VerifyErrorResponse {
  error: {
    isPending: boolean;
    message: string;
  };
}

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
    if (err != null) {
      const error = err as Error;

      logger.error(`Unable to authenticate user: ${error.message}`, error);
      next(err);
      return;
    }

    try {
      const sub = req.auth?.payload.sub;

      if (req.auth == null) {
        logger.error(`No authentication found. This should never happen.`);
        return res.status(404).json({
          error: { isPending: false, message: "User not found" },
        } satisfies VerifyErrorResponse);
      }

      if (sub == null) {
        logger.error(`No sub found for ${JSON.stringify(req.auth)}`);
        return res.status(401).json({
          error: { isPending: false, message: "Unauthorized" },
        } satisfies VerifyErrorResponse);
      }

      // Look up the user in the database so the _id can be stored and
      // used by all the rest of the service.
      const user = await Auth0UserModel.findOne({ sub });

      if (user == null) {
        logger.error(`No user found for ${sub}`);
        return res.status(404).json({ message: "User not found" });
      }

      // Kind of a hack, just blindly replace the Auth0 sub (which isn't useful elsewhere)
      // with the _id of the user in the database (which is useful).
      req.auth.payload.sub = user._id.toString();

      next();
    } catch (err) {
      const error = err as Error;

      logger.error(`Error retrieving user information: ${error.message}`, error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const dumpJwt = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.headers.authorization);
  next();
};

export const verifyRole =
  (role: string) => async (req: Auth0UserRequest, res: Response, next: NextFunction) => {
    const sub = req.auth?.payload.sub;

    if (sub == null) {
      logger.error(`No sub found for ${JSON.stringify(req.auth)}`);
      return res.status(401).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    const userInfo = await Auth0UserModel.findOrCreate(sub);

    if (userInfo == null) {
      logger.error(`No user found for ${sub}`);
      return res.status(401).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    // Pending users get a special 403 message
    if (userInfo.isPending) {
      logger.warn(`User ${sub} (${userInfo._id.toString()}) is pending approval`);
      return res.status(403).json({
        error: { isPending: true, message: "Account not verified" },
      } satisfies VerifyErrorResponse);
    }
    // If the role doesn't match they also get a 403 message
    else if (!userInfo.roles.includes(role)) {
      logger.error(
        `User ${sub} (${userInfo._id.toString()}) has ${userInfo.roles.join(
          ", "
        )} roles but not the requested role ${role}`
      );
      return res.status(403).json({
        error: { isPending: false, message: "Unauthorized" },
      } satisfies VerifyErrorResponse);
    }

    // User and role is validated so allow the next middleware to execute
    next();
  };
