import express, { Request, Response } from "express";
import {
  addActiveFlightPlan,
  getActiveFlightPlans,
  removeActiveFlightPlan,
  removeActiveFlightPlanByFlightPlanId,
} from "../controllers/activeFlightPlan.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

// GET route for getting all the active flight plans for a controller
router.get(
  "/activeFlightPlans",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { _id: controllerId } = req.user!;

    const result = await getActiveFlightPlans(controllerId);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "NoFlightPlansFound") {
      res.status(404).json({ error: `Flight plans for controller ${controllerId} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the active flight plans." });
    }
  }
);

router.post(
  "/activeFlightPlans/:flightPlanId",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { flightPlanId } = req.params;
    const { _id: controllerId } = req.user!;

    const result = await addActiveFlightPlan(controllerId, flightPlanId);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "UnknownError") {
      res
        .status(404)
        .json({ error: `Unable to add ${flightPlanId} for controller ${controllerId}.` });
    } else {
      res.status(500).json({ error: "Failed to add an active flight plan." });
    }
  }
);

router.delete(
  "/activeFlightPlans/:id",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { id: flightPlanId } = req.params;

    const result = await removeActiveFlightPlan(flightPlanId);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "UnknownError") {
      res.status(404).json({ error: `Unable to remove active flight plan ${flightPlanId}` });
    } else {
      res.status(500).json({ error: "Failed to remove an active flight plan." });
    }
  }
);

router.delete(
  "/activeFlightPlans/:flightPlanId",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { flightPlanId } = req.params;
    const { _id: controllerId } = req.user!;

    const result = await removeActiveFlightPlanByFlightPlanId(controllerId, flightPlanId);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "UnknownError") {
      res.status(404).json({ error: `Unable to remove active flight plan ${flightPlanId}` });
    } else {
      res.status(500).json({ error: "Failed to remove an active flight plan." });
    }
  }
);

export default router;
