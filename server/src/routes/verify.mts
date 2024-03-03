import express, { type Request, type Response } from "express";
import { getFlightPlan } from "../controllers/flightPlans.mjs";
import VerifyAllResult from "../controllers/verifyAllResult.mjs";
import findExistingResultsMiddleware from "../middleware/findExistingResults.mjs";

import { verifiers } from "../controllers/verifiers/allVerifiers.mjs";
import { verifyAll } from "../controllers/verifyAll.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { VerifierResultModel } from "../models/VerifierResult.mjs";

const router = express.Router();

// Generic handler for verifier routes
const handleVerifierRoute = async (routeName: string, handler: Function) => {
  router.get(
    `/verify/${routeName}/:id`,
    verifyUser,
    secureQueryMiddleware,
    findExistingResultsMiddleware(routeName),
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const flightPlan = await getFlightPlan(id);
      try {
        if (!flightPlan.success) {
          if (flightPlan.errorType === "FlightPlanNotFound") {
            return res.status(404).json({
              error: `Unable to run ${routeName}: flight plan ${id} not found.`,
            });
          } else {
            return res.status(500).json({
              error: `Failed to run ${routeName} for flight plan ${id}.`,
            });
          }
        }

        const result = await handler(flightPlan.data);

        if (result.success) {
          return res.status(200).json(result.data);
        } else {
          return res.status(500).json({
            error: `Failed to run ${routeName} for flight plan ${id}.`,
          });
        }
      } catch (error) {
        return res.status(500).json({
          error: `Failed to run ${routeName} for flight plan ${id}.`,
        });
      }
    }
  );
};

// Register the route to get all the results for a past run
router.get(
  "/verify/results/:id",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    try {
      const rawResults = await VerifierResultModel.find({
        flightPlanId: req.params.id,
      }).cacheQuery();

      // If there are no results send back an empty object. This ensures the
      // UI can tell the difference between no results and some results when it
      // comes to displaying status indicators.
      if (rawResults.length === 0) {
        return res.status(201).json({});
      }

      const result = new VerifyAllResult();
      result.addMany(rawResults);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        error: `Failed to get results for flight plan ${req.params.id}.`,
      });
    }
  }
);

// Register the route to delete all the results for a past run
router.delete("/verify/results/:id", async (req: Request, res: Response) => {
  try {
    await VerifierResultModel.deleteMany({ flightPlanId: req.params.id });

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({
      error: `Failed to delete results for flight plan ${req.params.id}.`,
    });
  }
});

// Register the route to run all verifiers
router.get(
  "/verify/all/:id",
  verifyUser,
  secureQueryMiddleware,
  findExistingResultsMiddleware(),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const flightPlan = await getFlightPlan(id);

      if (!flightPlan.success) {
        if (flightPlan.errorType === "FlightPlanNotFound") {
          return res.status(404).json({
            error: `Unable to run verifiers: flight plan ${id} not found.`,
          });
        } else {
          return res.status(500).json({
            error: `Failed to run verifiers for flight plan ${id}.`,
          });
        }
      }

      const verifyAllResult = await verifyAll(flightPlan.data);

      return res.status(200).json(verifyAllResult);
    } catch (error) {
      return res.status(500).json({
        error: `Failed to run verifiers for flight plan ${id}.`,
      });
    }
  }
);

// Register all the individual verifier routes
for (const verifier of verifiers) {
  handleVerifierRoute(verifier.name, verifier.handler);
}

export default router;
