import { startServer, stopServer } from "../../src/server.mjs";

export function serverSetup() {
  startServer(25541);
}

export async function serverTeardown() {
  await stopServer();
}
