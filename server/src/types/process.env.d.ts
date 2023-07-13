// From https://stackoverflow.com/a/56666712
export interface IProcessEnv {}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}
