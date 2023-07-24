import passport from "passport";
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";

const dev = process.env.NODE_ENV !== "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: dev ? false : "none",
} as CookieOptions;

export const getAuthToken = (user: any): string => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

export const getRefreshToken = (user: any): string => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

export const verifyUser = passport.authenticate("jwt", { session: false });
