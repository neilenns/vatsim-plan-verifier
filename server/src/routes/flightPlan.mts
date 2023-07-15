import express, { Request, Response } from "express";
import IFlightPlan from "../interfaces/flightPlan.mjs";
import { getFlightPlan, putFlightPlan } from "../controllers/flightPlans.mjs";

const router = express.Router();

// POST route for storing a flight plan
router.post("/flightPlan", async (req: Request, res: Response) => {
  try {
    const flightPlanData: IFlightPlan = req.body;

    res.status(201).json(putFlightPlan(flightPlanData));
  } catch (error) {
    res.status(500).json({ error: "Failed to store the flight plan." });
  }
});

// GET route for reading a flight plan from the database
router.get("/flightPlan/:id", async (req: Request, res: Response) => {
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
});

export default router;
