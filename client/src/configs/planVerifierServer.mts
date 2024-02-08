/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// I have no idea why eslint complains about these two lines. It doesn't happen in another
// project that also uses Vite.
export const serverUrl = import.meta.env.VITE_SERVER_URL ?? "http://localhost:4001/";
export const apiKey = import.meta.env.VITE_API_KEY ?? "64c272258332d25b0d063587";
export const snackbarAutoHideDuration = 6000;
