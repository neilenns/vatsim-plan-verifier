import { Server } from "http";
import { Socket, Socket, Server as SocketIOServer } from "socket.io";
import debug from "debug";
import { ENV } from "../env.mjs";
import { verifySocketApiKey } from "../middleware/apikey.mjs";
import { getFlightAwareAirport } from "../controllers/flightAwareAirports.mjs";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socketEvents.mjs";

const logger = debug("plan-verifier:sockets");

async function registerForAirport(socket: Socket, airportCode: string) {
  logger(`Client requested data for ${airportCode}`);

  const airportInfo = await getFlightAwareAirport(airportCode);

  // Probably not a valid airport code
  if (!airportInfo.success) {
    socket.emit("airportNotFound", airportCode);
    return;
  }

  socket.join(airportCode);
}

function processWatchAirports(socket: Socket, airportCodes: string[]) {
  // First check for any insecure airport codes
  const insecureAirportCodes = airportCodes.filter((airportCode) => {});

  socket.join(airportCode);
}

export function setupSockets(server: Server): SocketIOServer {
  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: ENV.WHITELISTED_DOMAINS.split(","),
      credentials: true,
    },
  });

  io.use(verifySocketApiKey);

  io.on("connection", (socket) => {
    logger(`Client connected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`);

    // Listen for the 'setAirport' event from the client
    socket.on("watchAirports", async (airportCodes: string[]) => {
      logger(`Client requested data for ${airportCodes.join(", ")}`);

      processWatchAirports(socket, airportCodes);
    });

    socket.on("disconnect", () => {
      logger(
        `Client disconnected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
      );
    });
  });

  return io;
}
