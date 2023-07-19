import { NextFunction, Request, Response } from "express";
import VerifierResult from "../models/VerifierResult.mjs";

// Looks for existing verification results in the database based on the incoming flight plan ID
// and verifier name. If some are found returns those instead of re-running the same verification
// on the same flight plan ID.
const findExistingResultsMiddleware =
  (verifier?: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Check if there are existing results for the given ID and endpoint name
      const existingResults = verifier
        ? await VerifierResult.find({
            flightPlanId: id,
            verifier,
          })
        : await VerifierResult.find({ flightPlanId: id });

      if (existingResults && existingResults.length > 0) {
        // Add a header indicating these were existing results to simplify
        // unit testing later.
        res.setHeader("X-Existing-Results", "true");

        // If existing results are found, send them back as the response
        return res.json(existingResults);
      }

      // If no existing results are found, continue to the actual controller
      return next();
    } catch (error) {
      // Handle any errors that occur during the verification process
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

export default findExistingResultsMiddleware;
