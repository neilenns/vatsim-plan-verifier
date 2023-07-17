import express, { Request, Response } from "express";
import { getFlightPlan } from "../controllers/flightPlans.mjs";
import { hasEquipmentSuffix } from "../controllers/verifiers/hasEquipmentSuffix.mjs";
import { IFlightPlan } from "../models/FlightPlan.mjs";
import VerifierControllerResult from "../types/verifierControllerResult.mjs";

const router = express.Router();

type HandlerFunction = (
  flightPlan: IFlightPlan
) => Promise<VerifierControllerResult>;

// Generic handler for verifier routes
const handleVerifierRoute = async (routeName: string, handler: Function) => {
  router.get(
    `/verify/${routeName}/:id`,
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const result = await getFlightPlan(id);

      if (!result.success) {
        if (result.errorType === "FlightPlanNotFound") {
          return res.status(404).json({
            error: `Unable to run ${routeName}: flight plan ${id} not found.`,
          });
        } else {
          return res.status(500).json({
            error: `Failed to run ${routeName} for flight plan ${id}.`,
          });
        }
      }

      const verifierResult = await handler(result.data);

      if (verifierResult.success) {
        return res.status(200).json(verifierResult.data);
      } else {
        return res.status(500).json({
          error: `Failed to run ${routeName} for flight plan ${id}.`,
        });
      }
    }
  );
};

// Add all the verifiers. So easy. So cool.
handleVerifierRoute("hasEquipmentSuffix", hasEquipmentSuffix);

export default router;
