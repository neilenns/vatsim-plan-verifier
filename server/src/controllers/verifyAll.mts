import { PromisePool } from "@supercharge/promise-pool";
import mainLogger from "../logger.mjs";
import { FlightPlan } from "../models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultModel } from "../models/VerifierResult.mjs";
import { logMongoBulkErrors } from "../utils.mjs";
import { verifiers } from "./verifiers/allVerifiers.mjs";
import VerifyAllResult from "./verifyAllResult.mjs";

const logger = mainLogger.child({ service: "verifyAll" });

export async function verifyAll(flightPlan: FlightPlan): Promise<VerifyAllResult> {
  const verifyAllResult = new VerifyAllResult();
  let verifierResultDocuments: VerifierResultDocument[] = [];

  // Loop across all registered verifiers and save all successful verification runs
  // to send back to the client.
  await PromisePool.withConcurrency(10)
    .for(verifiers)
    .process(async (verifier) => {
      const result = await verifier.handler(flightPlan, false);

      if (result.success) {
        // Handles the case of verifiers returning multiple results, e.g. the checkForCustom*Messages verifiers
        if (result.data instanceof Array) {
          verifyAllResult.addMany(result.data);
          verifierResultDocuments = verifierResultDocuments.concat(result.data);
        } else {
          verifyAllResult.add(result.data);
          verifierResultDocuments.push(result.data);
        }
      }
    });

  try {
    await VerifierResultModel.bulkSave(verifierResultDocuments);
  } catch (err) {
    logMongoBulkErrors(logger, err);
  }

  return verifyAllResult;
}
