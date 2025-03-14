import express, { type Response } from "express";
import { getAirportInfo } from "../controllers/airportInfo.mjs";
import { type Auth0UserRequest, verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

router.get(
  "/airportInfo/:airportCode",
  verifyUser,
  secureQueryMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Auth0UserRequest, res: Response) => {
    const { airportCode } = req.params;

    try {
      const result = await getAirportInfo(airportCode);

      if (!result.success) {
        return res.status(404).json({ error: result.error });
      }

      res.json(result.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
