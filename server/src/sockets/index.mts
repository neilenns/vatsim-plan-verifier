import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import debug from "debug";
import { ENV } from "../env.mjs";
import { verifySocketApiKey } from "../middleware/apikey.mjs";
import { getFlightAwareAirport } from "../controllers/flightAwareAirports.mjs";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socketEvents.mjs";

const logger = debug("plan-verifier:sockets");

async function registerForAirports(socket: Socket, airportCodes: string[]) {
  logger(`Client requested data for ${airportCodes.join(", ")}`);

  // Check for insecure airport codes first
  const insecureAirportCodes = airportCodes.filter((airportCode) => airportCode.startsWith("$"));
  if (insecureAirportCodes.length > 0) {
    logger(
      `Detected potential NoSQL injection in airport code(s) '${insecureAirportCodes.join(", ")}'`
    );
    socket.emit("insecureAirportCode", insecureAirportCodes);
    return;
  }

  // Check to see if the airport code is valid
  const invalidAirportCodes: string[] = [];
  await Promise.all(
    airportCodes.map(async (airportCode) => {
      const result = await getFlightAwareAirport(airportCode);
      if (!result.success) {
        invalidAirportCodes.push(airportCode);
      }
    })
  );

  if (invalidAirportCodes.length > 0) {
    logger(`Invalid airport code(s) '${invalidAirportCodes.join(", ")}'`);
    socket.emit("airportNotFound", invalidAirportCodes);
    return;
  }

  // Join the socket to the room based on a sorted list of trimmed airport codes.
  // The APT: in the front allows this room to be distinguished from the auto-generated
  // room that every client gets put in to.
  socket.join(
    `APT:${airportCodes
      .map((code) => code.toUpperCase().trim())
      .sort((a, b) => a.localeCompare(b))
      .join(",")}`
  );
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

      await registerForAirports(socket, airportCodes);
    });

    socket.on("disconnect", () => {
      logger(
        `Client disconnected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
      );
    });
  });

  return io;
}
