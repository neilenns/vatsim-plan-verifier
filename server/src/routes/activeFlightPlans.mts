import express, { type Request, type Response } from "express";
import {
  addActiveFlightPlan,
  getActiveFlightPlans,
  removeActiveFlightPlan,
  removeActiveFlightPlanByIdentifiers,
} from "../controllers/activeFlightPlan.mjs";
import { type Auth0UserRequest, verifyAndAddUserInfo } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import mainLogger from "../logger.mjs";
import { type AuthResult } from "express-oauth2-jwt-bearer";

const logger = mainLogger.child({ service: "activeFlightPlans" });

const router = express.Router();

interface TypedActiveFlightPlansRequest<T> extends Express.Request {
  auth?: AuthResult;
  body: T;
}

// GET route for getting all the active flight plans for a controller
router.get(
  "/activeFlightPlans",
  verifyAndAddUserInfo,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Auth0UserRequest, res: Response) => {
    const controllerId = req.auth?.payload.sub;

    if (controllerId == null) {
      logger.error(`No sub specified for controllerId. This should never happen.`);
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (
    req: TypedActiveFlightPlansRequest<{ flightPlanId: string; callsign: string }>,
    res: Response
  ) => {
    const { flightPlanId, callsign } = req.body;
    const controllerId = req.auth?.payload.sub;

    if (controllerId == null) {
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (
    req: TypedActiveFlightPlansRequest<{ flightPlanId: string; callsign: string }>,
    res: Response
  ): Promise<void> => {
    const { flightPlanId, callsign } = req.body;
    const controllerId = req.auth?.payload.sub;

    if (controllerId == null) {
      res.status(401).json({ error: `Unauthorized` });
      return;
    }

    if (flightPlanId === "" || callsign === "") {
      res.status(404).json({ error: `Either flightPlanID or callsign wasn't specified` });
      return;
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
