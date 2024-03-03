import express, { type Request, type Response } from "express";
import * as bree from "../bree.mjs";
import { type JobName } from "../bree.mjs";
import { type Auth0UserRequest, verifyRole, verifyUser } from "../middleware/permissions.mjs";
import { type ParamsDictionary } from "express-serve-static-core";
import mainLogger from "../logger.mjs";
import { getIO } from "../sockets/index.mjs";

const logger = mainLogger.child({ service: "endConnections" });

const router = express.Router();

interface StartJobParams extends ParamsDictionary {
  jobName: JobName;
}

router.get(
  "/admin/endConnections",
  verifyUser,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  verifyRole("admin"),
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (_req: Auth0UserRequest, res: Response) => {
    let count = 0;
    getIO().sockets.sockets.forEach((socket) => {
      // Call disconnect() on each socket
      socket.disconnect(true); // true parameter means the disconnect is forced
      count++;
    });

    logger.info(`Disconnected ${count} clients`);
    res.send(`Disconnected ${count} clients`);
  }
);

router.get(
  "/admin/startJob/:jobName",
  verifyUser,
  verifyRole("admin"),
  async (req: Request<StartJobParams, {}, {}, {}>, res: Response) => {
    try {
      const { jobName } = req.params;

      bree.runJob(jobName);

      res.send(`${jobName} started`);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
