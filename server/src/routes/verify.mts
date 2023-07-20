import express, { Request, Response } from "express";
import { getFlightPlan } from "../controllers/flightPlans.mjs";
import { IFlightPlan } from "../models/FlightPlan.mjs";
import VerifierControllerResult from "../types/verifierControllerResult.mjs";
import VerifyAllResult from "../controllers/verifyAllResult.mjs";

import hasEquipmentSuffix from "../controllers/verifiers/hasEquipmentSuffix.mjs";
import warnHeavyRunwayAssignment from "../controllers/verifiers/warnHeavyRunwayAssignment.mjs";
import altitudeForDirectionOfFlight from "../controllers/verifiers/altitudeForDirectionOfFlight.mjs";
import checkEquipmentSuffixAgainstKnown from "../controllers/verifiers/checkEquipmentSuffixAgainstKnown.mjs";
import findExistingResultsMiddleware from "../middleware/findExistingResults.mjs";
import routeWithFlightAware from "../controllers/verifiers/routeWithFlightAware.mjs";
import checkForPreferredRoutes from "../controllers/verifiers/checkForPreferredRoutes.mjs";
import nonRVSMIsBelow290 from "../controllers/verifiers/nonRVSMIsBelow290.mjs";
import jetIsNotSlantA from "../controllers/verifiers/jetIsNotSlantA.mjs";
import nonRNAVHasAirways from "../controllers/verifiers/nonRNAVHasAirways.mjs";
import validDepartureAirport from "../controllers/verifiers/validDepartureAirport.mjs";
import validArrivalAirport from "../controllers/verifiers/validArrivalAirport.mjs";
import checkForNonStandardEquipmentSuffix from "../controllers/verifiers/checkForNonStandardEquipmentSuffix.mjs";

const router = express.Router();

type HandlerFunction = (flightPlan: IFlightPlan) => Promise<VerifierControllerResult>;

type Verifier = {
  name: string;
  handler: HandlerFunction;
};

// List of verifiers to support
const verifiers: Verifier[] = [
  { name: "hasEquipmentSuffix", handler: hasEquipmentSuffix },
  { name: "warnHeavyRunwayAssignment", handler: warnHeavyRunwayAssignment },
  {
    name: "altitudeForDirectionOfFlight",
    handler: altitudeForDirectionOfFlight,
  },
  {
    name: "checkEquipmentSuffixAgainstKnown",
    handler: checkEquipmentSuffixAgainstKnown,
  },
  { name: "routeWithFlightAware", handler: routeWithFlightAware },
  { name: "checkForPreferredRoutes", handler: checkForPreferredRoutes },
  { name: "nonRVSMIsBelow290", handler: nonRVSMIsBelow290 },
  { name: "jetIsNotSlantA", handler: jetIsNotSlantA },
  { name: "nonRNAVHasAirways", handler: nonRNAVHasAirways },
  { name: "validDepartureAirport", handler: validDepartureAirport },
  { name: "validArrivalAirport", handler: validArrivalAirport },
  { name: "checkForNonStandardEquipmentSuffix", handler: checkForNonStandardEquipmentSuffix },
];

// Generic handler for verifier routes
const handleVerifierRoute = async (routeName: string, handler: Function) => {
  router.get(
    `/verify/${routeName}/:id`,
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

// Register the route to run all verifiers
router.get("/verify/all/:id", findExistingResultsMiddleware(), async (req: Request, res: Response) => {
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

    const verifyAllResult = new VerifyAllResult();

    // Loop across all registered verifiers and save all successful verification runs
    // to send back to the client.
    for (const verifier of verifiers) {
      const result = await verifier.handler(flightPlan.data);

      if (result.success) {
        verifyAllResult.add(result.data);
      }
    }

    return res.status(200).json(verifyAllResult);
  } catch (error) {
    return res.status(500).json({
      error: `Failed to run verifiers for flight plan ${id}.`,
    });
  }
});

// Register all the individual verifier routes
for (const verifier of verifiers) {
  handleVerifierRoute(verifier.name, verifier.handler);
}

export default router;
