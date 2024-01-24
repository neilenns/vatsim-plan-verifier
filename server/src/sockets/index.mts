import { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { setVatsimDataUpdateInterval } from "../bree.mjs";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";
import { publishEDCTupdate, publishFlightPlanUpdate } from "../services/vatsim.mjs";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socketEvents.mjs";

const logger = mainLogger.child({ service: "sockets" });

let io: SocketIOServer;

// Takes an array of airport codes, converts them all to upper case, and trims whitespace
function cleanAirportCodes(codes: string[]): string[] {
  return codes.map((code) => code.toUpperCase().trim());
}

function sortTrimAndJoin(codes: string[]): string {
  return codes
    .map((code) => code.toUpperCase().trim())
    .sort((a, b) => a.localeCompare(b))
    .join(",");
}

async function checkForInvalidAirports(codes: string[]): Promise<string[]> {
  const invalidAirportCodes: string[] = [];
  await Promise.all(
    codes.map(async (code) => {
      const result = await getAirportInfo(code);
      if (!result.success) {
        invalidAirportCodes.push(code);
      }
    })
  );

  return invalidAirportCodes;
}

async function registerForEDCT(
  io: SocketIOServer,
  socket: Socket,
  departureCodes: string[],
  arrivalCodes: string[]
) {
  const insecureCodes = [
    ...departureCodes.filter((code) => code.startsWith("$")),
    ...arrivalCodes.filter((code) => code.startsWith("$")),
  ];

  if (insecureCodes.length > 0) {
    logger.warn(
      `Detected potential NoSQL injection in airport code(s) '${insecureCodes.join(", ")}'`
    );
    socket.emit("insecureAirportCode", insecureCodes);
    return;
  }

  const invalidAirportCodes = [
    ...(await checkForInvalidAirports(departureCodes)),
    ...(await checkForInvalidAirports(arrivalCodes)),
  ];

  if (invalidAirportCodes.length > 0) {
    logger.warn(`Invalid airport code(s) '${invalidAirportCodes.joinWithWord("and")}'`);
    socket.emit("airportNotFound", invalidAirportCodes);
    return;
  }

  // Join the socket to the room based on a sorted list of trimmed airport codes.
  // The EDCT: in the front allows this room to be distinguished from the auto-generated
  // room that every client gets put in to.
  const roomName = `EDCT:${sortTrimAndJoin(departureCodes)}|${sortTrimAndJoin(arrivalCodes)}`;

  socket.join(roomName);
  publishEDCTupdate(io, roomName);
}

async function registerForAirports(io: SocketIOServer, socket: Socket, airportCodes: string[]) {
  // Check for insecure airport codes first
  const insecureAirportCodes = airportCodes.filter((airportCode) => airportCode.startsWith("$"));
  if (insecureAirportCodes.length > 0) {
    logger.warn(
      `Detected potential NoSQL injection in airport code(s) '${insecureAirportCodes.join(", ")}'`
    );
    socket.emit("insecureAirportCode", insecureAirportCodes);
    return;
  }

  const invalidAirportCodes = await checkForInvalidAirports(airportCodes);
  if (invalidAirportCodes.length > 0) {
    logger.warn(`Invalid airport code(s) '${invalidAirportCodes.joinWithWord("and")}'`);
    socket.emit("airportNotFound", invalidAirportCodes);
    return;
  }

  // Join the socket to the room based on a sorted list of trimmed airport codes.
  // The APT: in the front allows this room to be distinguished from the auto-generated
  // room that every client gets put in to.
  const roomName = `APT:${sortTrimAndJoin(airportCodes)}`;

  socket.join(roomName);

  // Send the initial data to the client
  publishFlightPlanUpdate(io, roomName);
}

export function getIO() {
  return io;
}

export function setupSockets(server: Server) {
  io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: ENV.WHITELISTED_DOMAINS.split(","),
      credentials: true,
    },
  });

  // io.use(verifySocketApiKey);

  io.on("connection", async (socket) => {
    logger.info(
      `Client connected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
    );

    setVatsimDataUpdateInterval(ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_CONNECTIONS);

    // Listen for the 'setAirport' event from the client
    socket.on("watchAirports", async (airportCodes: string[]) => {
      logger.info(`Client requested data for ${airportCodes.join(", ")}`);

      await registerForAirports(io, socket, cleanAirportCodes(airportCodes));
    });

    socket.on("watchEDCT", async (departureCodes: string[], arrivalCodes: string[]) => {
      logger.info(
        `Client requested EDCT data for departures: "${departureCodes.join(
          ", "
        )}" and arrivals: "${arrivalCodes.join(", ")}"`
      );

      await registerForEDCT(
        io,
        socket,
        cleanAirportCodes(departureCodes),
        cleanAirportCodes(arrivalCodes)
      );
    });

    socket.on("disconnect", async () => {
      logger.info(
        `Client disconnected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
      );

      if (io.sockets.sockets.size === 0) {
        setVatsimDataUpdateInterval(ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS);
      }
    });
  });
}
