// From https://stackoverflow.com/a/56666712
export interface IProcessEnv {}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {
      FLIGHTAWARE_API_KEY: string;
      MONGO_DB_CONNECTION_STRING: string;
      MONGO_DB_NAME: string;
      WHITELISTED_DOMAINS: string;
      GEOMAG_API_KEY: string;
      API_RATE_LIMIT_MAX?: string;
      API_RATE_LIMIT_MINUTE_WINDOW?: string;
      REFRESH_TOKEN_EXPIRY: string;
      SESSION_EXPIRY: string;
      JWT_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}
