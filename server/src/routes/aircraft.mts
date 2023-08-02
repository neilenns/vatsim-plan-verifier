import express, { Request, Response } from "express";
import { getAircraft } from "../controllers/aircraft.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/aircraft/:id",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getAircraft(id);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "AircraftNotFound") {
      res.status(404).json({ error: `Aircraft ${id} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the aircraft." });
    }
  }
);

export default router;
