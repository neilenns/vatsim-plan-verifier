import express, { type Request, type Response } from "express";
import { getQuickReference, getQuickReferenceList } from "../controllers/quickReference.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get(
  "/quickreference/:key",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { key } = req.params;

    const result = await getQuickReference(key);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "QuickReferenceNotFound") {
      res.status(404).json({ error: `Quick reference ${key} not found.` });
    } else {
      res.status(500).json({ error: "Failed to get quick reference." });
    }
  }
);

router.get(
  "/quickreferencelist",
  verifyUser,
  secureQueryMiddleware,
  asyncHandler(async (_: Request, res: Response) => {
    const result = await getQuickReferenceList();

    if (result.success) {
      res.json(result.data);
      return;
    }

    res.status(500).json({ error: "Failed to get quick reference list." });
  })
);

export default router;
