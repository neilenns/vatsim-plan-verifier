// From https://stackoverflow.com/a/56666712
export interface IProcessEnv {}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {
      FLIGHTAWARE_API_KEY: string;
      MONGO_DB_CONNECTION_STRING: string;
      MONGO_DB_NAME: string;
      WHITELISTED_DOMAINS: string;
    }
  }
}
