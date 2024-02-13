import "dotenv/config";
import z from "zod";

function booleanTransformer(v: string, ctx: z.RefinementCtx) {
  v = v.toLowerCase();
  switch (v) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: z.ZodParsedType.boolean,
        received: z.ZodParsedType.string,
        message: 'Expected "true" or "false"',
      });
      return false;
  }
}

const envSchema = z.object({
  // from https://github.com/colinhacks/zod/issues/1630#issuecomment-1623726247
  AIRPORT_INFO_AUTO_UPDATE_INTERVAL: z.string().default("at 1:42 am"),
  AIRPORT_REFRESH_INTERVAL: z.string().default("every 24 hours"),
  API_RATE_LIMIT_MAX: z.coerce.number().default(100),
  API_RATE_LIMIT_MINUTE_WINDOW: z.coerce.number().default(5),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_ISSUER_BASE_URL: z.string(),
  CACHE_DIRECTORY: z.string().default("/cache"),
  COOKIE_SECRET: z.string(),
  COAST_TIME_MINUTES: z.coerce.number().default(2),
  SSL_PRIVATE_KEY_PATH: z.string().default(""),
  SSL_FULL_CHAIN_PATH: z.string().default(""),
  FLIGHTAWARE_API_KEY: z.string(),
  GEOMAG_API_KEY: z.string(),
  GET_AIRPORT_INFO_FROM_FLIGHT_AWARE: z
    .string()
    .transform<boolean>(booleanTransformer)
    .default("false"),
  JWT_SECRET: z.string(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug", "trace"]).optional(),
  LOGTAIL_TOKEN: z.string().optional(),
  MAGNETIC_DECLINATION_CACHE_EXPIRY: z.coerce.number().default(30 * 24 * 60 * 60 * 1000), // 30 days
  MONGO_DB_CONNECTION_STRING: z.string(),
  MONGO_DB_NAME: z.string().default("plan-verifier"),
  MONGOOSE_DEBUG: z.string().transform<boolean>(booleanTransformer).default("false"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4001),
  REFRESH_TOKEN_EXPIRY: z.string().default("60 * 60 * 24 * 30"),
  REFRESH_TOKEN_SECRET: z.string(),
  SESSION_EXPIRY: z.string().default("60 * 15"),
  TRUST_PROXY: z.coerce.number().default(0),
  VATSIM_DATA_AUTO_UPDATE_INTERVAL_CONNECTIONS: z.string().default("every 15 seconds"),
  VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS: z.string().default("every 60 seconds"),
  VATSIM_DISTANCE_CUTOFF_IN_KM: z.coerce.number().default(5.5),
  VATSIM_GROUNDSPEED_CUTOFF: z.coerce.number().default(50),
  VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL_CONNECTIONS: z.string().default("every 30 seconds"),
  VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS: z.string().default("every 2 minutes"),
  VERSION: z.string().default("dev"),
  UPDATE_DELTA_GROUND_SPEED: z.coerce.number().default(5),
  UPDATE_DELTA_LATITUDE: z.coerce.number().default(0.6),
  UPDATE_DELTA_LONGITUDE: z.coerce.number().default(0.6),
  WHITELISTED_DOMAINS: z.string(),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) return result.error.issues;
};
