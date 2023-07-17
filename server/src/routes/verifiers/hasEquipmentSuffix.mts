import express, { Request, Response } from "express";
import { getFlightPlan } from "../../controllers/flightPlans.mjs";
import { hasEquipmentSuffix } from "../../controllers/verifiers/hasEquipmentSuffix.mjs";

const router = express.Router();

router.get(
  "/verify/hasEquipmentSuffix/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getFlightPlan(id);

    if (!result.success) {
      if (result.errorType === "FlightPlanNotFound") {
        return res.status(404).json({
          error: `Unable to run hasEquipmentSuffix: flight plan ${id} not found.`,
        });
      } else {
        return res.status(500).json({
          error: `Failed to run hasEquipmentSuffix for flight plan ${id}.`,
        });
      }
    }

    const verifierResult = await hasEquipmentSuffix(result.data);

    if (verifierResult.success) {
      return res.status(200).json(verifierResult.data);
    } else {
      return res.status(500).json({
        error: `Failed to run hasEquipmentSuffix for flight plan ${id}.`,
      });
    }
  }
);

export default router;
