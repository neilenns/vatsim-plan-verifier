import express, { Request, Response } from "express";
import {
  addActiveFlightPlan,
  getActiveFlightPlans,
  removeActiveFlightPlan,
} from "../controllers/activeFlightPlan.mjs";

const router = express.Router();

// GET route for getting all the active flight plans for a controller
router.get("/activeFlightPlans/:controllerId", async (req: Request, res: Response) => {
  const { controllerId } = req.params;

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
});

router.post(
  "/activeFlightPlans/:controllerId/:flightPlanId",
  async (req: Request, res: Response) => {
    const { controllerId, flightPlanId } = req.params;

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

router.delete("/activeFlightPlans/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await removeActiveFlightPlan(id);

  if (result.success) {
    res.json(result.data);
    return;
  }

  if (result.errorType === "UnknownError") {
    res.status(404).json({ error: `Unable to remove active flight plan ${id}` });
  } else {
    res.status(500).json({ error: "Failed to remove an active flight plan." });
  }
});

export default router;
