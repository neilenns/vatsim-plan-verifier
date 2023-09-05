import express, { Request, Response } from "express";
import { getFlightPlan } from "../controllers/flightPlans.mjs";
import VerifierControllerResult, {
  VerifierControllerMultiResult,
} from "../types/verifierControllerResult.mjs";
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
import airwaysForEquipmentSuffix from "../controllers/verifiers/airwaysForEquipmentSuffix.mjs";
import hasSID from "../controllers/verifiers/hasSID.mjs";
import hasValidFirstFix from "../controllers/verifiers/hasValidFirstFix.mjs";
import warnNewPilot from "../controllers/verifiers/warnNewPilot.mjs";

import { VerifierResultModel } from "../models/VerifierResult.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import pistonNotSlantLorZ from "../controllers/verifiers/pistonNotSlantLorZ.mjs";
import checkKPDXtoKSLEAltitude from "../controllers/verifiers/checkKPDXtoKSLEAltitude.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import checkForCustomAirportMessages from "../controllers/verifiers/checkForCustomAirportMessages.mjs";
import checkForCustomDepartureMessages from "../controllers/verifiers/checkForCustomDepartureMessages.mjs";
import checkSEAvsMONTN from "../controllers/verifiers/checkSEAvsMONTN.mjs";
import { FlightPlan } from "../models/FlightPlan.mjs";
import altitudeForAltimeter from "../controllers/verifiers/altitudeForAltimeter.mjs";

const router = express.Router();

type HandlerFunction = (
  flightPlan: FlightPlan
) => Promise<VerifierControllerResult | VerifierControllerMultiResult>;

type Verifier = {
  name: string;
  handler: HandlerFunction;
};

// List of verifiers to support
const verifiers: Verifier[] = [
  { name: "checkForCustomAirportMessages", handler: checkForCustomAirportMessages },
  { name: "checkForCustomDepartureMessages", handler: checkForCustomDepartureMessages },
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
  { name: "airwaysForEquipmentSuffix", handler: airwaysForEquipmentSuffix },
  { name: "hasSID", handler: hasSID },
  { name: "hasValidFirstFix", handler: hasValidFirstFix },
  { name: "pistonNotSlantLorZ", handler: pistonNotSlantLorZ },
  { name: "checkKPDXtoKSLEAltitude", handler: checkKPDXtoKSLEAltitude },
  { name: "checkSEAvsMONTN", handler: checkSEAvsMONTN },
  { name: "warnNewPilot", handler: warnNewPilot },
  { name: "altitudeForAltimeter", handler: altitudeForAltimeter },
];

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
      const rawResults = await VerifierResultModel.find({ flightPlanId: req.params.id });

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

      const verifyAllResult = new VerifyAllResult();

      // Loop across all registered verifiers and save all successful verification runs
      // to send back to the client.
      for (const verifier of verifiers) {
        const result = await verifier.handler(flightPlan.data);

        if (result.success) {
          // Handles the case of verifiers returning multiple results, e.g. the checkForCustom*Messages verifiers
          if (result.data instanceof Array) {
            verifyAllResult.addMany(result.data);
          } else {
            verifyAllResult.add(result.data);
          }
        }
      }

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
