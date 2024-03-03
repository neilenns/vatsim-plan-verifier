import express, { type Request, type Response } from "express";
import { getDeparture } from "../controllers/departure.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

// GET route for reading a departure from the database
router.get(
  "/departure/:id",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getDeparture(id);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "DepartureNotFound") {
      res.status(404).json({ error: `Departure ${id} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the departure." });
    }
  }
);

export default router;
