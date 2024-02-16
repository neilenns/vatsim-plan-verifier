import express, { Request, Response } from "express";
import { getVatsimAtis } from "../../controllers/vatsim.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { verifyApiKey } from "../../middleware/apikey.mjs";

interface ATISParams extends ParamsDictionary {
  callsign: string;
}

interface ATISQueryParams extends Query {
  format: string;
  codeOnly: string;
  padding: string;
}

const router = express.Router();

function appendPadding(text: string, padding: number) {
  return `${text}${" ".repeat(padding)}`;
}

router.get(
  "/vatsim/atis/:callsign",
  verifyApiKey,
  secureQueryMiddleware,
  async (req: Request<ATISParams, {}, {}, ATISQueryParams>, res: Response) => {
    const codeOnly = JSON.parse(req.query.codeOnly?.toLowerCase() ?? "false");
    const jsonResponseRequested = req.query.format?.toUpperCase() === "JSON";
    const padding = parseInt(req.query.padding ?? "0");
    const result = await getVatsimAtis(req.params.callsign);

    if (result.success) {
      if (codeOnly) {
        res.send(`${result.data.code}`);
      } else if (jsonResponseRequested) {
        res.json(result.data);
      } else {
        res.send(appendPadding(result.data.text, padding));
      }
      return;
    } else {
      const errorMessage = `No ATIS available for ${req.params.callsign}`;

      if (!jsonResponseRequested || codeOnly) {
        res.status(500).send(appendPadding(errorMessage, padding));
      } else {
        res.status(500).json({ error: errorMessage });
      }
    }
  }
);

export default router;
