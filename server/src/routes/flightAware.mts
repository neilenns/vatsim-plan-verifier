import express from "express";
import { getFlightAwareRoutes } from "../controllers/flightAwareRoutes.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { FlightPlanDocument } from "../models/FlightPlan.mjs";

const router = express.Router();

router.get(
  "/flightAwareRoutes/:departure/:arrival",
  verifyUser,
  secureQueryMiddleware,
  async (req, res) => {
    const { departure, arrival } = req.params;

    try {
      const routes = await getFlightAwareRoutes({
        departure,
        arrival,
      } as FlightPlanDocument);

      if (routes.success === false) {
        return res.status(404).json({ error: routes.error });
      }

      res.json(routes.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
