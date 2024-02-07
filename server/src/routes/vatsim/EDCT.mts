import express, { Request, Response } from "express";
import { Query } from "express-serve-static-core";
import {
  getVatsimEDCTFlightPlans,
  getVatsimEDCTViewOnly,
  setVatsimFlightPlanEDCT,
} from "../../controllers/vatsim.mjs";
import { verifyUser } from "../../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";

interface EDCTQueryParams extends Query {
  d: string[];
  a: string[];
}

interface TypedEDCTRequestBody<T> extends Express.Request {
  body: T;
}

const router = express.Router();

router.put(
  "/vatsim/flightPlans/edct",
  verifyUser,
  async (
    req: TypedEDCTRequestBody<{ _id: string; callsign: string; EDCT: Date }>,
    res: Response
  ) => {
    if (!req.body._id && !req.body.callsign) {
      res.status(500).json({ error: "Either _id or callsign must be specified" });
      return;
    }

    if (req.body.EDCT === undefined) {
      res.status(500).json({ error: "edct must be specified" });
      return;
    }

    const result = await setVatsimFlightPlanEDCT(req.body._id, req.body.callsign, req.body.EDCT);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "FlightPlanNotFound") {
      res.status(404).json({
        error: `Flight plan not found for ${req.body._id ? req.body._id : req.body.callsign}.`,
      });
    } else {
      res.status(500).json({ error: "Failed to get the flight plans." });
    }
  }
);

router.get(
  "/vatsim/flightPlans/edct/viewonly",
  secureQueryMiddleware,
  async (req: Request<{}, {}, {}, EDCTQueryParams>, res: Response) => {
    const result = await getVatsimEDCTViewOnly(req.query.d);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "FlightPlansNotFound") {
      res.status(404).json({ error: `Flight plans not found for ${req.query.d}.` });
    } else {
      res.status(500).json({ error: "Failed to get the flight plans." });
    }
  }
);

router.get(
  "/vatsim/flightPlans/edct",
  secureQueryMiddleware,
  async (req: Request<{}, {}, {}, EDCTQueryParams>, res: Response) => {
    const result = await getVatsimEDCTFlightPlans(req.query.d, req.query.a);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "FlightPlansNotFound") {
      res.status(404).json({ error: `Flight plans not found for ${req.query.d} ${req.query.a}.` });
    } else {
      res.status(500).json({ error: "Failed to get the flight plans." });
    }
  }
);

export default router;
