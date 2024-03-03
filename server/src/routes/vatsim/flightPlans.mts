import express, { type Request, type Response } from "express";
import { getVatsimFlightPlan, getVatsimFlightPlans } from "../../controllers/vatsim.mjs";
import { verifyUser } from "../../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";
import { type VatsimFlightStatus } from "../../models/VatsimFlightPlan.mjs";

const router = express.Router();

router.get(
  "/vatsim/flightPlans/:airport/:flightRules/:status",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const result = await getVatsimFlightPlans(
      req.params.airport,
      req.params.flightRules,
      req.params.status as VatsimFlightStatus
    );

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "FlightPlansNotFound") {
      res.status(404).json({ error: `Flight plans not found for ${req.params.airport}.` });
    } else {
      res.status(500).json({ error: "Failed to get the flight plans." });
    }
  }
);

router.get(
  "/vatsim/flightPlan/:callsign/:format",
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const result = await getVatsimFlightPlan(req.params.callsign);

    const jsonResponseRequested = req.params.format.toUpperCase() === "JSON";

    if (result.success) {
      if (jsonResponseRequested) {
        res.json(result.data);
      } else {
        // PAY7812  B737/L  2000 KSEA - KLAX  370 SUMMA2 SUMMA JINMO Q7 JAGWA BURGL IRNMN2
        res.send(
          `${result.data.callsign} ${result.data.rawAircraftType} ${result.data.squawk} ${result.data.departure} - ${result.data.arrival} ${result.data.cruiseAltitude} ${result.data.route}`
        );
      }
      return;
    }

    if (result.errorType === "FlightPlanNotFound") {
      if (jsonResponseRequested) {
        res.status(404).json({ error: `Flight plan not found for ${req.params.callsign}.` });
      } else {
        res.status(404).send(`No flight plan found for ${req.params.callsign}`);
      }
    } else {
      if (jsonResponseRequested) {
        res.status(500).json({ error: "Failed to get the flight plan." });
      } else {
        res.status(500).send(`Failed to get a flight plan for ${req.params.callsign}.`);
      }
    }
  }
);
export default router;
