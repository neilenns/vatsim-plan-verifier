import express, { Response } from "express";
import { getAuth0User } from "../controllers/user.mjs";
import { Auth0UserRequest, verifyUser } from "../middleware/permissions.mjs";

const router = express.Router();

router.get("/users/me", verifyUser, async (req: Auth0UserRequest, res: Response) => {
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

export default router;
