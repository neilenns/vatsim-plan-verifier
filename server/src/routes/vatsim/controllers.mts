import express, { type Request, type Response } from "express";
import { type Query } from "express-serve-static-core";
import {
  getVatsimControllerByCallsign,
  getVatsimControllers,
  getVatsimControllersByARTCC,
  type VatsimControllersResult,
} from "../../controllers/vatsim.mjs";
import { verifyApiKey } from "../../middleware/apikey.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";

interface ControllerQueryParams extends Query {
  callsign: string;
  artcc: string;
}

const router = express.Router();

router.get(
  "/vatsim/controllers",
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  verifyApiKey,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request<unknown, unknown, unknown, ControllerQueryParams>, res: Response) => {
    let result: VatsimControllersResult;

    if (req.query.callsign !== undefined && req.query.callsign.length > 0) {
      result = await getVatsimControllerByCallsign(req.query.callsign.toUpperCase());
    } else if (req.query.artcc !== undefined && req.query.artcc.length > 0) {
      result = await getVatsimControllersByARTCC(req.query.artcc.toUpperCase());
    } else {
      result = await getVatsimControllers();
    }

    if (result.success) {
      res.json(result.data);
    } else {
      const errorMessage = `Unable to find controller info`;
      res.status(500).json({ error: errorMessage });
    }
  }
);

export default router;
