import debug from "debug";
import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { ENV } from "../env.mjs";
import { publishUpdate } from "../services/vatsim.mjs";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socketEvents.mjs";

const logger = debug("plan-verifier:sockets");

// Takes an array of airport codes, converts them all to upper case, and trims whitespace
function cleanAirportCodes(codes: string[]): string[] {
  return codes.map((code) => code.toUpperCase().trim());
}

async function registerForAirports(io: SocketIOServer, socket: Socket, airportCodes: string[]) {
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
      const result = await getAirportInfo(airportCode);
      if (!result.success) {
        invalidAirportCodes.push(airportCode);
      }
    })
  );

  if (invalidAirportCodes.length > 0) {
    logger(`Invalid airport code(s) '${invalidAirportCodes.joinWithWord("and")}'`);
    socket.emit("airportNotFound", invalidAirportCodes);
    return;
  }

  // Join the socket to the room based on a sorted list of trimmed airport codes.
  // The APT: in the front allows this room to be distinguished from the auto-generated
  // room that every client gets put in to.
  const roomName = `APT:${airportCodes
    .map((code) => code.toUpperCase().trim())
    .sort((a, b) => a.localeCompare(b))
    .join(",")}`;

  socket.join(roomName);

  // Send the initial data to the client
  publishUpdate(io, roomName);
}

export function setupSockets(server: Server): SocketIOServer {
  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: ENV.WHITELISTED_DOMAINS.split(","),
      credentials: true,
    },
  });

  // io.use(verifySocketApiKey);

  io.on("connection", (socket) => {
    logger(`Client connected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`);

    // Listen for the 'setAirport' event from the client
    socket.on("watchAirports", async (airportCodes: string[]) => {
      logger(`Client requested data for ${airportCodes.join(", ")}`);

      await registerForAirports(io, socket, cleanAirportCodes(airportCodes));
    });

    socket.on("watchEDCT", async (departureCodes: string[], arrivalCodes: string[]) => {
      logger(
        `Client requested EDCT data for departures: "${departureCodes.join(
          ", "
        )}" and arrivals: "${arrivalCodes.join(", ")}"`
      );
    });

    socket.on("disconnect", () => {
      logger(
        `Client disconnected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
      );
    });
  });

  return io;
}
