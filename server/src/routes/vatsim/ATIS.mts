import express, { type Request, type Response } from "express";
import { getVatsimAtis } from "../../controllers/vatsim.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";
import { type ParamsDictionary, type Query } from "express-serve-static-core";
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

function appendPadding(text: string, padding: number): string {
  return `${text}${" ".repeat(padding)}`;
}

router.get(
  "/vatsim/atis/:callsign",
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  verifyApiKey,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request<ATISParams, unknown, unknown, ATISQueryParams>, res: Response) => {
    const codeOnly = JSON.parse(req.query.codeOnly?.toLowerCase() ?? "false") as string;
    const jsonResponseRequested = req.query.format?.toUpperCase() === "JSON";
    const padding = parseInt(req.query.padding ?? "0");
    const result = await getVatsimAtis(req.params.callsign);

    if (result.success) {
      if (codeOnly !== "") {
        res.send(`${result.data.code}`);
      } else if (jsonResponseRequested) {
        res.json(result.data);
      } else {
        res.send(appendPadding(result.data.text, padding));
      }
    } else {
      const errorMessage = `No ATIS available for ${req.params.callsign}`;

      if (!jsonResponseRequested || codeOnly !== "") {
        res.status(500).send(appendPadding(errorMessage, padding));
      } else {
        res.status(500).json({ error: errorMessage });
      }
    }
  }
);

export default router;
