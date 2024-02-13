// React router middleware for checking permissions on routes
// based on the request type (GET, PUT, POST, DELETE, etc.)
// and the user's permissions in the mongo database.

// Import the User model
import { auth } from "express-oauth2-jwt-bearer";
import passport from "passport";
import { ENV } from "../env.mjs";

export const verifyApiAccess = auth({
  audience: ENV.AUTH0_AUDIENCE,
  issuerBaseURL: ENV.AUTH0_ISSUER_BASE_URL,
});

export const verifyUser = passport.authenticate("jwt", { session: false });
