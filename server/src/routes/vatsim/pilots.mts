import express, { type Request, type Response } from "express";
import { getVatsimPilotStats } from "../../controllers/vatsim.mjs";
import { verifyUser } from "../../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get(
  "/vatsim/pilots/:cid",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const result = await getVatsimPilotStats(Number(req.params.cid));

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "PilotNotFound") {
      res.status(404).json({ error: `Pilot ${req.params.cid} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the pilot stats." });
    }
  }
);

export default router;
