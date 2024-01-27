import express, { Request, Response } from "express";
import mainLogger from "../logger.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { getIO } from "../sockets/index.mjs";

const logger = mainLogger.child({ service: "endConnections" });

const router = express.Router();

// GET route for reading a flight plan from the database
router.get("/endConnections", verifyUser, async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "You are not authorized to access this resource." });
    return;
  }

  let count = 0;
  getIO().sockets.sockets.forEach((socket) => {
    // Call disconnect() on each socket
    socket.disconnect(true); // true parameter means the disconnect is forced
    count++;
  });

  logger.info(`Disconnected ${count} clients`);
  res.send(`Disconnected ${count} clients`);
});

export default router;
