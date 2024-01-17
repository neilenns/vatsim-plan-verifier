import express, { Request, Response } from "express";
import { getVatsimAtis } from "../../controllers/vatsim.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";
import { ParamsDictionary, Query } from "express-serve-static-core";

interface ATISParams extends ParamsDictionary {
  callsign: string;
}

interface ATISQueryParams extends Query {
  format: string;
  codeOnly: string;
}

const router = express.Router();

router.get(
  "/vatsim/atis/:callsign",
  secureQueryMiddleware,
  async (req: Request<ATISParams, {}, {}, ATISQueryParams>, res: Response) => {
    const codeOnly = JSON.parse(req.query.codeOnly?.toLowerCase() ?? "false");
    const jsonResponseRequested = req.query.format?.toUpperCase() === "JSON";

    const result = await getVatsimAtis(req.params.callsign);

    if (result.success) {
      if (codeOnly) {
        res.send(`${result.data.code}`);
      } else if (jsonResponseRequested) {
        res.json(result.data);
      } else {
        res.send(`${result.data.text}`);
      }
      return;
    } else {
      res.status(500).json({ error: `Failed to get ATIS for ${req.params.callsign}.` });
    }
  }
);

export default router;
