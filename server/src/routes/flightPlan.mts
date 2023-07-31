import express, { Request, Response } from "express";
import IFlightPlanDocument from "../interfaces/IFlightPlanDocument.mjs";
import {
  getFlightPlan,
  getFlightPlansPaginated,
  putFlightPlan,
} from "../controllers/flightPlans.mjs";
import { verifyUser } from "../middleware/permissions.mjs";

const router = express.Router();

// POST route for storing a flight plan
router.post("/flightPlan", verifyUser, async (req: Request, res: Response) => {
  const flightPlanData: IFlightPlanDocument = req.body;

  const result = await putFlightPlan(flightPlanData);

  if (result.success) {
    res.status(201).json(result.data);
  } else {
    res.status(500).json({ error: "Failed to store the flight plan." });
  }
});

// GET route for reading a flight plan from the database
router.get("/flightPlan/id/:id", verifyUser, async (req: Request, res: Response) => {
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

// GET route for reading all flight plans from the database
router.get("/flightPlan/all/:page/:limit", verifyUser, async (req: Request, res: Response) => {
  const result = await getFlightPlansPaginated(
    parseInt(req.params.page),
    parseInt(req.params.limit)
  );

  if (result.success) {
    res.json(result.data);
    return;
  }

  if (result.errorType === "FlightPlansNotFound") {
    res.status(404).json({ error: `Flight plans not found.` });
  } else {
    res.status(500).json({ error: "Failed to get the flight plans." });
  }
});

export default router;
