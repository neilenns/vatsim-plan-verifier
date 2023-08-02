import express, { Request, Response } from "express";
import { verifyUser } from "../middleware/permissions.mjs";
import { getVatsimFlightPlans } from "../controllers/vatsim.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get(
  "/vatsim/flightPlans/:airport",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const result = await getVatsimFlightPlans(req.params.airport);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "FlightPlansNotFound") {
      res.status(404).json({ error: `Flight plans not found for ${req.params.airport}.` });
    } else {
      res.status(500).json({ error: "Failed to get the flight plans." });
    }
  }
);
export default router;
