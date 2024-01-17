import express, { Request, Response } from "express";
import { getVatsimAtis } from "../../controllers/vatsim.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get(
  "/vatsim/atis/:callsign/:format",
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const result = await getVatsimAtis(req.params.callsign);

    const jsonResponseRequested = req.params.format.toUpperCase() === "JSON";

    if (result.success) {
      if (jsonResponseRequested) {
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
