import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4001),
  MONGO_DB_CONNECTION_STRING: z.string(),
  MONGO_DB_NAME: z.string().default("plan-verifier"),
  FLIGHTAWARE_API_KEY: z.string(),
  GEOMAG_API_KEY: z.string(),
  WHITELISTED_DOMAINS: z.string(),
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string().default("60 * 60 * 24 * 30"),
  SESSION_EXPIRY: z.string().default("60 * 15"),
  API_RATE_LIMIT_MAX: z.coerce.number().default(100),
  API_RATE_LIMIT_MINUTE_WINDOW: z.coerce.number().default(5),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  VATSIM_AUTO_UPDATE_INTERVAL: z.coerce.number().default(1000 * 30), // 30 seconds
  MONGOOSE_DEBUG: z.coerce.boolean().default(false),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) return result.error.issues;
};
