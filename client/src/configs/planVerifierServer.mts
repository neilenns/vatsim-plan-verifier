declare global {
  interface Window {
    SERVER_URL: string;
  }
}

export const serverUrl = window.SERVER_URL ?? "http://localhost:4001/";
