import { NextFunction, Request, Response } from "express";
import { auth, AuthResult } from "express-oauth2-jwt-bearer";
import { ENV } from "../env.mjs";
import { Auth0UserModel } from "../models/Auth0User.mjs";

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
