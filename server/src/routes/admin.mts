import express, { Request, Response } from "express";
import * as bree from "../bree.mjs";
import { JobName } from "../bree.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { ParamsDictionary } from "express-serve-static-core";
import mainLogger from "../logger.mjs";
import { getIO } from "../sockets/index.mjs";

const logger = mainLogger.child({ service: "endConnections" });

const router = express.Router();

interface StartJobParams extends ParamsDictionary {
  jobName: JobName;
}

router.get("/admin/endConnections", verifyUser, async (req: Request, res: Response) => {
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

router.get(
  "/admin/startJob/:jobName",
  verifyUser,
  async (req: Request<StartJobParams, {}, {}, {}>, res) => {
    try {
      if (req.user?.role !== "admin") {
        res.status(403).json({ error: "You are not authorized to access this resource." });
        return;
      }

      const { jobName } = req.params;

      bree.runJob(jobName);

      res.send(`${jobName} started`);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
