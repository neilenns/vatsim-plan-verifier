import express, { Request, Response } from "express";
import { getNavaidById, getNavaidByIdent } from "../controllers/navaid.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import { getQuickReference, getQuickReferenceList } from "../controllers/quickReference.mjs";

const router = express.Router();

// GET route for reading a navaid by ID from the database
router.get(
  "/quickreference/:key",
  verifyUser,
  secureQueryMiddleware,
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

// GET route for reading a navaid by name from the database
router.get(
  "/quickreferencelist",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const result = await getQuickReferenceList();

    if (result.success) {
      res.json(result.data);
      return;
    }

    res.status(500).json({ error: "Failed to get quick reference list." });
  }
);

export default router;
