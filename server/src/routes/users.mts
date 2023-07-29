import express, { Request, Response } from "express";
import { getUsers, updateUser } from "../controllers/user.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { IUser } from "../models/User.mjs";

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

// PUT route for updating a user
router.put("/users", verifyUser, async (req: Request, res: Response) => {
  const result = await updateUser(req.body as IUser);

  if (result.success) {
    res.json(result.data);
    return;
  }

  res.status(500).json({ error: "Failed to update the users." });
});

export default router;
