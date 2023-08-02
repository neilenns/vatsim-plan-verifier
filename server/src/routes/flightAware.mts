import express from "express";
import { getFlightAwareRoutes } from "../controllers/flightAwareRoutes.mjs";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";
import { getFlightAwareAirport } from "../controllers/flightAwareAirports.mjs";
import { IFlightAwareAirport } from "../models/FlightAwareAirport.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

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
      } as IFlightPlanDocument);

      if (routes.success === false) {
        return res.status(404).json({ error: routes.error });
      }

      res.json(routes.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

router.get(
  "/flightAwareAirport/:airportCode",
  verifyUser,
  secureQueryMiddleware,
  async (req, res) => {
    const { airportCode } = req.params;

    try {
      const result = await getFlightAwareAirport(airportCode);

      if (!result.success) {
        return res.status(404).json({ error: result.error });
      }

      res.json(result.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
