import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "jetsOnlyOnRNAV";
const logger = mainLogger.child({ service: verifierName });

export default async function jetsOnlyOnRNAV({
  _id,
  equipmentInfo,
  SIDInformation,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  try {
    if (!isDocument(equipmentInfo) || !equipmentInfo.engineType) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = "No engine type information found. Unable to verify jetsOnlyOnRNAV.";
      result.messageId = "noEngineTypeInformation";
      result.priority = 5;
    } else if (!isDocument(SIDInformation)) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = "No SID information found. Unable to verify jetsOnlyOnRNAV.";
      result.messageId = "noSIDInformation";
      result.priority = 5;
    }
    // This is the test the verifier is supposed to do.
    else if (equipmentInfo.engineType !== "J" && SIDInformation.IsRNAV) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Aircraft has ${equipmentInfo.engineType} engines, but SID is RNAV. Verify the SID allows non-jet aircraft.`;
      result.messageId = "nonJetOnRNAV";
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Aircraft engine type is compatible with the SID.`;
      result.priority = 5;
      result.messageId = "engineTypeMatchesSID";
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running jetsOnlyOnRNAV: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running jetsOnlyOnRNAV: ${error.message}`,
    };
  }
}
