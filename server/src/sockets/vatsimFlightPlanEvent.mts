// sockets/socketHandlers.ts
import { Server, Socket } from "socket.io";
import VatsimFlightPlanModel from "../models/VatsimFlightPlan.mjs";
import debug from "debug";

const logger = debug("plan-verifier:vatsimFlightPlanEvent");

function handleSocketConnection(socket: Socket) {
  logger("A client connected for vatsimFlightPlanEvent");

  // Listen for the 'setParameter' event from the client
  socket.on("setParameter", async (airportCode: string) => {
    logger(`Client requested data for ${airportCode}`);

    // Join the room corresponding to the parameter value
    socket.join(airportCode);
  });

  socket.on("disconnect", () => {
    logger("A client disconnected for vatsimFlightPlanEvent");
  });
}

export default function vatsimFlightPlanSocketHandler(io: Server): void {
  io.on("connection", handleSocketConnection);
}
