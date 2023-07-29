import express, { Request, Response } from "express";
import { getUser, getUsers, updateUser } from "../controllers/user.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { IUser } from "../models/User.mjs";

const router = express.Router();

router.get("/users/:id", verifyUser, async (req: Request, res: Response) => {
  // If the caller isn't an admin then they can only request the user information
  // for themselves.
  if (req.user?.role !== "admin" && req.user?._id?.toString() !== req.params.id) {
    res.status(403).json({ error: "You are not authorized to access this resource." });
    return;
  }

  const result = await getUser(req.params.id);

  if (result.success) {
    res.json(result.data);
    return;
  }

  res.status(500).json({ error: "Failed to get the user." });
});

// GET route for reading all the users from the database
router.get("/users", verifyUser, async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "You are not authorized to access this resource." });
    return;
  }

  const result = await getUsers();

  if (result.success) {
    res.json(result.data);
    return;
  }

  res.status(500).json({ error: "Failed to get the users." });
});

// PUT route for updating a user
router.put("/users", verifyUser, async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "You are not authorized to access this resource." });
    return;
  }

  const result = await updateUser(req.body as IUser);

  if (result.success) {
    res.json(result.data);
    return;
  }

  res.status(500).json({ error: "Failed to update the users." });
});

export default router;
