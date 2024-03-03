import express, { type Request, type Response } from "express";
import { getPreferredRoutes } from "../controllers/preferredRoutes.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";
import asyncHandler from "express-async-handler";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/preferredRoutes/:departure/:arrival",
  verifyUser,
  secureQueryMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { departure, arrival } = req.params;

    const result = await getPreferredRoutes(departure, arrival);

    if (result.success) {
      res.json(result.data);
      return;
    }

    if (result.errorType === "NoPreferredRoutesFound") {
      res.status(404).json({
        error: `No preferred routes found between ${departure} and ${arrival}`,
      });
    } else {
      res.status(500).json({
        error: `Failed to get preferred routes between ${departure} and ${arrival}`,
      });
    }
  })
);

export default router;
