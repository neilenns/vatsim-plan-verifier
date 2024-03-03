import express, { type Request, type Response } from "express";
import { getVatsimPilotStats } from "../../controllers/vatsim.mjs";
import { verifyUser } from "../../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/vatsim/pilots/:cid",
  verifyUser,
  secureQueryMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
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
  })
);

export default router;
