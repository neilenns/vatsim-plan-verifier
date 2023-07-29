import express, { Request, Response } from "express";
import { getNavaidById, getNavaidByIdent } from "../controllers/navaid.mjs";
import { verifyUser } from "../middleware/permissions.mjs";

const router = express.Router();

// GET route for reading a navaid by ID from the database
router.get("/navaid/:id", verifyUser, async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await getNavaidById(id);

  if (result.success) {
    res.json(result.data);
    return;
  }

  if (result.errorType === "NavaidNotFound") {
    res.status(404).json({ error: `Navaid ${id} not found.` });
  } else {
    res.status(500).json({ error: "Failed to get navaid." });
  }
});

// GET route for reading a navaid by name from the database
router.get("/navaid/ident/:ident", verifyUser, async (req: Request, res: Response) => {
  const { ident } = req.params;

  const result = await getNavaidByIdent(ident);

  if (result.success) {
    res.json(result.data);
    return;
  }

  if (result.errorType === "NavaidNotFound") {
    res.status(404).json({ error: `Navaid ${ident} not found.` });
  } else {
    res.status(500).json({ error: "Failed to get navaid." });
  }
});

export default router;
