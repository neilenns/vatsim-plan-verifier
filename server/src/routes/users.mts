import express, { type Response } from "express";
import { getAuth0User, updateAuth0User } from "../controllers/user.mjs";
import mainLogger from "../logger.mjs";
import { type Auth0UserRequest, verifyUser } from "../middleware/permissions.mjs";
import { type Auth0User } from "../models/Auth0User.mjs";

const logger = mainLogger.child({ service: "usersRoute" });

interface TypedUserRequestBody<T> extends Express.Request {
  body: T;
}

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put("/users/me", verifyUser, async (req: TypedUserRequestBody<Auth0User>, res: Response) => {
  if (req.auth?.payload.sub == null) {
    logger.error(`Unable to update data for user, no id provided`);
    return res.status(404).send("User not found");
  }

  const result = await updateAuth0User(req.auth.payload.sub, req.body);

  if (result.success) {
    return res.json(result.data);
  } else {
    logger.error(`Unable to update ${req.body.sub}: ${result.error}`);
    return res.status(500).json({ error: result.error });
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/users/me", verifyUser, async (req: Auth0UserRequest, res: Response) => {
  const sub = req.auth?.payload.sub;

  if (sub == null) {
    logger.error(`Unable to fetch data for user, no sub provided`);
    return res.status(404).send("User not found");
  }

  const result = await getAuth0User(sub);
  if (result.success) {
    return res.json(result.data);
  } else {
    logger.error(`Unable to fetch data for ${sub}: user not found`);
    return res.status(404).json({ error: "Failed to get the user." });
  }
});

export default router;
