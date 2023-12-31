import passport from "passport";
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";
import { ENV } from "./env.mjs";

const dev = ENV.NODE_ENV !== "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(ENV.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: dev ? false : "none",
} as CookieOptions;

export const getAuthToken = (user: any): string => {
  return jwt.sign(user, ENV.JWT_SECRET, {
    expiresIn: eval(ENV.SESSION_EXPIRY),
  });
};

export const getRefreshToken = (user: any): string => {
  const refreshToken = jwt.sign(user, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(ENV.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};
