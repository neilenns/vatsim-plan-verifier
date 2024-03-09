import express, { type Request, type Response } from "express";
import { getAircraftById, getAircraftByName } from "../controllers/aircraft.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/aircraft/:id",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getAircraftById(id);

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

// GET route for reading a flight plan from the database
router.get(
  "/aircraft/name/:name",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = await getAircraftByName(name);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "AircraftNotFound") {
      res.status(404).json({ error: `Aircraft ${name} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the aircraft." });
    }
  }
);

export default router;
