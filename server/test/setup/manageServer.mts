import { startServer, stopServer } from "@app/server.mjs";

export function serverSetup() {
  startServer(25541);
}

export async function serverTeardown() {
  await stopServer();
}
