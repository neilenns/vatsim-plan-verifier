import express from "express";
import { getFlightAwareRoutes } from "../controllers/flightAwareRoutes.mjs";
import IFlightPlan from "../interfaces/flightPlan.mjs";

const router = express.Router();

router.get("/flightAwareRoutes/:departure/:arrival", async (req, res) => {
  const { departure, arrival } = req.params;

  try {
    const routes = await getFlightAwareRoutes({
      departure,
      arrival,
    } as IFlightPlan);
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
