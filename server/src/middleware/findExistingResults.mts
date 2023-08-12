import { NextFunction, Request, Response } from "express";
import { VerifierResultModel } from "../models/VerifierResult.mjs";
import VerifyAllResult from "../controllers/verifyAllResult.mjs";

// Looks for existing verification results in the database based on the incoming flight plan ID
// and verifier name. If some are found returns those instead of re-running the same verification
// on the same flight plan ID.
const findExistingResultsMiddleware =
  (verifier?: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // The shape of data returned varies depending on whether a single verifier
      // was requested or all verifiers were requested.

      // Single verifier case
      if (verifier) {
        const existingResults = await VerifierResultModel.find({
          flightPlanId: id,
          verifier,
        });

        if (existingResults && existingResults.length > 0) {
          res.setHeader("X-Existing-Results", "true");
          return res.json(existingResults);
        }
      }

      // All verifiers case
      else {
        const existingResults = await VerifierResultModel.find({ flightPlanId: id });

        if (existingResults && existingResults.length > 0) {
          const verifyAllResult = new VerifyAllResult();

          verifyAllResult.addMany(existingResults);
          res.setHeader("X-Existing-Results", "true");
          return res.json(verifyAllResult);
        }
      }

      // If no existing results are found, continue to the actual controller
      return next();
    } catch (error) {
      // Handle any errors that occur during the verification process
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

export default findExistingResultsMiddleware;
