import { PromisePool } from "@supercharge/promise-pool";
import { type Server } from "http";
import { type Socket, Server as SocketIOServer } from "socket.io";
import { JobName, setJobUpdateInterval } from "../bree.mjs";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";
import {
  publishEDCTViewOnlyupdate,
  publishEDCTupdate,
  publishFlightPlanUpdate,
} from "../services/vatsim.mjs";
import { type ClientToServerEvents, type ServerToClientEvents } from "../types/socketEvents.mjs";
import { isOriginAllowed } from "../utils/cors.mjs";

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
  await PromisePool.for(codes).process(async (code) => {
    const result = await getAirportInfo(code);
    if (!result.success) {
      invalidAirportCodes.push(code);
    }
  });

  return invalidAirportCodes;
}

async function registerForEDCTViewOnly(
  io: SocketIOServer,
  socket: Socket,
  departureCodes: string[]
): Promise<void> {
  const insecureCodes = departureCodes.filter((code) => code.startsWith("$"));

  if (insecureCodes.length > 0) {
    logger.warn(
      `Detected potential NoSQL injection in airport code(s) '${insecureCodes.join(", ")}'`
    );
    socket.emit("insecureAirportCode", insecureCodes);
    return;
  }

  const invalidAirportCodes = await checkForInvalidAirports(departureCodes);

  if (invalidAirportCodes.length > 0) {
    logger.warn(`Invalid airport code(s) '${invalidAirportCodes.joinWithWord("and")}'`);
    socket.emit("airportNotFound", invalidAirportCodes);
    return;
  }

  // Join the socket to the room based on a sorted list of trimmed airport codes.
  // The EDCT: in the front allows this room to be distinguished from the auto-generated
  // room that every client gets put in to.
  const roomName = `EDCTViewOnly:${sortTrimAndJoin(departureCodes)}`;

  await socket.join(roomName);
  await publishEDCTViewOnlyupdate(io, roomName);
}

async function registerForEDCT(
  io: SocketIOServer,
  socket: Socket,
  departureCodes: string[],
  arrivalCodes: string[]
): Promise<void> {
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

  await socket.join(roomName);
  await publishEDCTupdate(io, roomName);
}

async function registerForAirports(
  io: SocketIOServer,
  socket: Socket,
  airportCodes: string[]
): Promise<void> {
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

  await socket.join(roomName);
  await publishFlightPlanUpdate(io, roomName);
}

export function getIO(): SocketIOServer {
  return io;
}

export async function setupSockets(server: Server): Promise<void> {
  io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: function (origin, callback) {
        if (origin == null || isOriginAllowed(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    },
  });

  // io.use(verifySocketApiKey);

  io.on("connection", async (socket) => {
    logger.info(
      `Client connected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
    );

    await setJobUpdateInterval(
      JobName.GetVatsimData,
      ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_CONNECTIONS
    );
    await setJobUpdateInterval(
      JobName.GetVatsimTransceivers,
      ENV.VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL_CONNECTIONS
    );

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

    socket.on("watchEDCTViewOnly", async (departureCodes: string[]) => {
      logger.info(
        `Client requested EDCT view only data for departures: "${departureCodes.join(", ")}"`
      );

      await registerForEDCTViewOnly(io, socket, cleanAirportCodes(departureCodes));
    });

    socket.on("disconnect", async () => {
      logger.info(
        `Client disconnected: ${socket.id}. Total connected clients: ${io.sockets.sockets.size}`
      );

      if (io.sockets.sockets.size === 0) {
        await Promise.all([
          setJobUpdateInterval(
            JobName.GetVatsimData,
            ENV.VATSIM_DATA_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS
          ),
          setJobUpdateInterval(
            JobName.GetVatsimTransceivers,
            ENV.VATSIM_TRANSCEIVER_AUTO_UPDATE_INTERVAL_NO_CONNECTIONS
          ),
        ]);
      }
    });
  });
}
