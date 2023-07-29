import express, { Request, Response } from "express";
import { getUsers } from "../controllers/user.mjs";
import { verifyUser } from "../middleware/permissions.mjs";

const router = express.Router();

// GET route for reading all the users from the database
router.get("/users", verifyUser, async (req: Request, res: Response) => {
  const result = await getUsers();

  if (result.success) {
    res.json(result.data);
    return;
  }

  res.status(500).json({ error: "Failed to get the users." });
});

export default router;
