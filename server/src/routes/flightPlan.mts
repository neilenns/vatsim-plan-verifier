import express, { Request, Response } from "express";
import FlightPlan, { IFlightPlan } from "../models/flightPlan.mjs";

const router = express.Router();

// POST route for storing a flight plan
router.post("/flightPlan", async (req: Request, res: Response) => {
  try {
    const flightPlanData: IFlightPlan = req.body;

    // Create a new instance of the FlightPlan model
    const newFlightPlan: IFlightPlan = new FlightPlan(flightPlanData);

    // Save the flight plan to the database
    const savedFlightPlan: IFlightPlan = await newFlightPlan.save();

    res.status(201).json(savedFlightPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to store the flight plan." });
  }
});

export default router;
