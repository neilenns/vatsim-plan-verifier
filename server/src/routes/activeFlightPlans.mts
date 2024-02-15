import express, { Request, Response } from "express";
import {
  addActiveFlightPlan,
  getActiveFlightPlans,
  removeActiveFlightPlan,
  removeActiveFlightPlanByIdentifiers,
} from "../controllers/activeFlightPlan.mjs";
import { Auth0UserRequest, verifyAndAddUserInfo } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "activeFlightPlans" });

const router = express.Router();

// GET route for getting all the active flight plans for a controller
router.get(
  "/activeFlightPlans",
  verifyAndAddUserInfo,
  secureQueryMiddleware,
  async (req: Auth0UserRequest, res: Response) => {
    const controllerId = req.auth?.payload.sub;

    if (!controllerId) {
      logger.error(`No sub specified for controllerId. This should never happen. ${req.auth}`);
      return res.status(401).json({ error: `Unauthorized` });
    }

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
  "/activeFlightPlans",
  verifyAndAddUserInfo,
  secureQueryMiddleware,
  async (req: Auth0UserRequest, res: Response) => {
    const { flightPlanId, callsign } = req.body;
    const controllerId = req.auth?.payload.sub;

    if (!controllerId) {
      return res.status(401).json({ error: `Unauthorized` });
    }

    const result = await addActiveFlightPlan(controllerId, flightPlanId, callsign);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "UnknownError") {
      res.status(404).json({
        error: `Unable to add ${flightPlanId}/${callsign} for controller ${controllerId}.`,
      });
    } else {
      res.status(500).json({ error: "Failed to add an active flight plan." });
    }
  }
);

router.delete(
  "/activeFlightPlans/:id",
  verifyAndAddUserInfo,
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
  "/activeFlightPlans",
  verifyAndAddUserInfo,
  secureQueryMiddleware,
  async (req: Auth0UserRequest, res: Response) => {
    const { flightPlanId, callsign } = req.body;
    const controllerId = req.auth?.payload.sub;

    if (!controllerId) {
      return res.status(401).json({ error: `Unauthorized` });
    }

    const result = await removeActiveFlightPlanByIdentifiers(controllerId, flightPlanId, callsign);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "UnknownError") {
      res
        .status(404)
        .json({ error: `Unable to remove active flight plan ${flightPlanId}/${callsign}` });
    } else {
      res.status(500).json({ error: "Failed to remove an active flight plan." });
    }
  }
);

export default router;
