import express, { type Request, type Response } from "express";
import { getAirline } from "../controllers/airline.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/airline/:airlineCode",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { airlineCode } = req.params;

    const result = await getAirline(airlineCode);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "AirlineNotFound") {
      res.status(404).json({ error: `Airline ${airlineCode} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the airline." });
    }
  }
);

export default router;
