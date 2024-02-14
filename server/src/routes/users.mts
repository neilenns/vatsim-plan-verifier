import express, { Request, Response } from "express";
import { getAuth0User, getUser, getUsers, updateUser } from "../controllers/user.mjs";
import { Auth0UserRequest, verifyApiAccess, verifyUser } from "../middleware/permissions.mjs";
import { IUser } from "../models/User.mjs";
import { Auth0UserModel } from "../models/Auth0User.mjs";

const router = express.Router();

router.get("/users/me", verifyApiAccess, async (req: Auth0UserRequest, res: Response) => {
  const sub = req.auth?.payload.sub;

  if (!sub) {
    return res.status(401).send("Unauthorized");
  }

  const result = await getAuth0User(sub);
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ error: "Failed to get the user." });
  }
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
