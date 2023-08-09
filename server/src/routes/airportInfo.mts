import express from "express";
import { getFlightAwareRoutes } from "../controllers/flightAwareRoutes.mjs";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get("/airportInfo/:airportCode", verifyUser, secureQueryMiddleware, async (req, res) => {
  const { airportCode } = req.params;

  try {
    const result = await getAirportInfo(airportCode);

    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
