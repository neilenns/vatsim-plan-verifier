import express, { type Request, type Response } from "express";
import { getFlightPlan, importFlightPlan, putFlightPlan } from "../controllers/flightPlans.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { type FlightPlan } from "../models/FlightPlan.mjs";

const router = express.Router();

interface TypedFlightPlanRequestBody<T> extends Express.Request {
  body: T;
}

// POST route for storing a flight plan
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/flightPlan", verifyUser, async (req: Request, res: Response) => {
  const flightPlanData: FlightPlan = req.body;

  const result = await putFlightPlan(flightPlanData);

  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json({ error: "Failed to store the flight plan." });
  }
});

// GET route for reading a flight plan from the database
router.get(
  "/flightPlan/:id",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getFlightPlan(id);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "FlightPlanNotFound") {
      res.status(404).json({ error: `Flight plan ${id} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the flight plan." });
    }
  }
);

router.post(
  "/flightPlan/import",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: TypedFlightPlanRequestBody<{ callsign: string }>, res: Response) => {
    const { callsign } = req.body;

    if (callsign == null || callsign === "") {
      res.status(400).json({ error: "Missing required parameter: callsign" });
      return;
    }

    const result = await importFlightPlan(callsign);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "VatsimFlightPlanNotFound") {
      res.status(404).json({ error: `Vatsim flight plan for ${callsign} not found.` });
    } else {
      res.status(500).json({ error: "Failed to import the flight plan." });
    }
  }
);

export default router;
