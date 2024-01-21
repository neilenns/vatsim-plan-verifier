import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "nonRVSMIsBelow290";
const logger = mainLogger.child({ service: verifierName });

export default async function nonRVSMIsBelow290({
  _id,
  isRVSMCapable,
  cruiseAltitude,
  equipmentSuffix,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "cruiseAltitude",
    priority: 5,
  });

  try {
    // If the plane is RVSM capable then there's nothing to check
    if (isRVSMCapable) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Plane is RVSM capable so no need to verify its altitude for RVSM compatibility.`;
      result.messageId = "RVSMCapable";
    }
    // Can't run check if there's no equipment suffix
    else if (!equipmentSuffix) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `No equipment suffix available so unable to verify altitude for RVSM compatibility.`;
      result.messageId = "noEquipmentSuffix";
    }
    // Plane isn't RVSM capable so make sure it isn't flying too high
    else if (cruiseAltitude >= 290) {
      result.status = VerifierResultStatus.ERROR;
      result.message = `Plane is not RVSM capable and is flying at or above FL290.`;
      result.messageId = "nonRVSMAtOrAbove290";
      result.priority = 3;
    }
    // Plane isn't RVSM capable but altitude is fine
    else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Plane is not RVSM capable but is flying below FL290.`;
      result.messageId = "nonRVSMBelow290";
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger.error(`Error running verifyNonRVSMIsBelow290: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyNonRVSMIsBelow290: ${error}`,
    };
  }
}
