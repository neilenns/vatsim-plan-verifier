import express, { type Response } from "express";
import { getFlightAwareRoutes } from "../controllers/flightAwareRoutes.mjs";
import { type Auth0UserRequest, verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { type FlightPlanDocument } from "../models/FlightPlan.mjs";

const router = express.Router();

router.get(
  "/flightAwareRoutes/:departure/:arrival",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Auth0UserRequest, res: Response) => {
    const { departure, arrival } = req.params;

    try {
      const routes = await getFlightAwareRoutes({
        departure,
        arrival,
      } satisfies Partial<FlightPlanDocument>);

      if (!routes.success) {
        return res.status(404).json({ error: routes.error });
      }

      res.json(routes.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
