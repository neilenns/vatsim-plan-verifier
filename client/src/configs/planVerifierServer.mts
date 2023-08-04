declare global {
  interface Window {
    SERVER_URL: string;
    API_KEY: string;
  }
}

export const serverUrl = window.SERVER_URL ?? "http://localhost:4001/";
export const apiKey = window.API_KEY ?? "64c272258332d25b0d063587";
export const snackbarAutoHideDuration = 6000;
