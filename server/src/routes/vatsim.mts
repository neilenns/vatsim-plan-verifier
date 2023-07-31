import express, { Request, Response } from "express";
import { verifyUser } from "../middleware/permissions.mjs";
import { getVatsimFlightPlans } from "../controllers/vatsim.mjs";

const router = express.Router();

router.get("/vatsim/flightPlans", verifyUser, async (req: Request, res: Response) => {
	if (req.user?.role !== "admin") {
    res.status(403).json({ error: "You are not authorized to access this resource." });
    return;
  }

  const result = await getVatsimFlightPlans();

  if (result.success) {
    res.json(result.data);
    return;
  }

  if (result.errorType === "VatsimFailure") {
    res.status(404).json({ error: `Vatsim failure.` });
  } else {
    res.status(500).json({ error: "Failed to get flight plans." });
  }
});

export default router;