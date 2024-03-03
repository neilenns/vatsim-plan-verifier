import express, { type Request, type Response } from "express";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { getMetar } from "../controllers/metar.mjs";

const router = express.Router();

router.get(
  "/metar/:airportCode",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const result = await getMetar(req.params.airportCode);

    if (result.success) {
      res.json(result.data);
      
    } else {
      res.status(500).json({ error: `Failed to get the metar for ${req.params.airportCode}.` });
    }
  }
);

export default router;
