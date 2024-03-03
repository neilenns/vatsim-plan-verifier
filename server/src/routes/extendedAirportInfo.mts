import express, { type Request, type Response } from "express";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { getExtendedAirportInfo } from "../controllers/extendedAirportInfo.mjs";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/extendedAirportInfo/:airportCode",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { airportCode } = req.params;

    const result = await getExtendedAirportInfo(airportCode);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "ExtendedAirportInfoNotFound") {
      res.status(404).json({ error: `Extended info not found for ${airportCode}.` });
    } else {
      res.status(500).json({ error: "Failed to get the extended airport info." });
    }
  }
);

export default router;
