import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import debug from "debug";
import { ENV } from "../env.mjs";
import { verifySocketApiKey } from "../middleware/apikey.mjs";

const logger = debug("plan-verifier:sockets");

export function setupSockets(server: Server): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ENV.WHITELISTED_DOMAINS.split(","),
      credentials: true,
    },
  });

  io.use(verifySocketApiKey);

  io.on("connection", (socket) => {
    logger(`Client connected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`);

    // Listen for the 'setAirport' event from the client
    socket.on("setAirport", async (airportCode: string) => {
      logger(`Client requested data for ${airportCode}`);

      socket.join(airportCode);
    });

    socket.on("disconnect", () => {
      logger(
        `Client disconnected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
      );
    });
  });

  return io;
}
