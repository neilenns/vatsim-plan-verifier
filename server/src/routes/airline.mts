import express, { type Request, type Response } from "express";
import { getAirline } from "../controllers/airline.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import asyncHandler from "express-async-handler";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/airline/:airlineCode",
  verifyUser,
  secureQueryMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
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
  })
);

export default router;
