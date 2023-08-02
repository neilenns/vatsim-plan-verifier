import express, { Request, Response } from "express";
import { getMagneticDeclination } from "../controllers/magneticDeclination.mjs";
import { verifyUser } from "../middleware/permissions.mjs";
import { secureQueryMiddleware } from "../middleware/secureQueryMiddleware.mjs";

const router = express.Router();

// GET route for reading a flight plan from the database
router.get(
  "/magneticDeclination/:latitude/:longitude",
  verifyUser,
  secureQueryMiddleware,
  async (req: Request, res: Response) => {
    const { latitude, longitude } = req.params;

    const lat: number = parseFloat(latitude);
    const lon: number = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      res.status(400).json({
        error: "Latitude and longitude should be numbers.",
      });
      return;
    }

    const result = await getMagneticDeclination(lat, lon);

    if (result.success) {
      res.json(result.data);
      return;
    }

    res.status(500).json({
      error: `Failed to get the magnetic declination for ${latitude} ${longitude}.`,
    });
  }
);

export default router;
