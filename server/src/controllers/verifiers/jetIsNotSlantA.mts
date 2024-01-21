import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "jetIsNotSlantA";
const logger = mainLogger.child({ service: verifierName });

export default async function jetIsNotSlantA({
  _id,
  equipmentCode,
  equipmentSuffix,
  equipmentInfo,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    status: VerifierResultStatus.INFORMATION,
    messageId: "jetIsNotSlantA",
    message: `${equipmentCode} with /${equipmentSuffix} is not /A.`,
    flightPlanPart: "rawAircraftType",
    priority: 5,
  });

  try {
    if (!isDocument(equipmentInfo)) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "unableToVerifyJetIsNotSlantANoAircraftInfo";
      result.message = `Unable to verify jet is not slant A because no aircraft info is available.`;
      result.priority = 5;
    }
    // Don't run the test on non-jet aircraft
    else if (equipmentInfo.engineType !== "J") {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "unableToVerifJetIsNotSlantAEngineTypeNotJ";
      result.message = `Unable to verify jet is not slant A because the aircraft isn't a jet.`;
      result.priority = 5;
    }
    // The actual test
    else if (equipmentSuffix === "A" && equipmentInfo.engineType === "J") {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "jetIsSlantA";
      result.message = `${equipmentCode} with /A is almost certainly not correct.`;
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger.error(`Error running : ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running : ${error}`,
    };
  }
}
