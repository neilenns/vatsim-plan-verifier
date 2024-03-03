import express, { type Request, type Response } from "express";
import { getTunedTransceiversForCallsign } from "../../controllers/vatsimTransceivers.mjs";
import { secureQueryMiddleware } from "../../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get(
  "/vatsim/transceivers/:callsign",
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const result = await getTunedTransceiversForCallsign(req.params.callsign);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "CallsignNotFound") {
      res.status(404).json({ error: `Callsign ${req.params.callsign} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get the transceivers." });
    }
  }
);

export default router;
