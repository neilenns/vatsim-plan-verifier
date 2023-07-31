import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import debug from "debug";
import vatsimFlightPlanSocketHandler from "./vatsimFlightPlanEvent.mjs";
import { ENV } from "../env.mjs";

const logger = debug("plan-verifier:sockets");

export function setupSockets(server: Server): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ENV.WHITELISTED_DOMAINS.split(","),
      credentials: true,
    },
  });

  vatsimFlightPlanSocketHandler(io);

  return io;
}
