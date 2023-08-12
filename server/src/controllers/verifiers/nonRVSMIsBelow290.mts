import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "nonRVSMIsBelow290";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function nonRVSMIsBelow290({
  _id,
  isRVSMCapable,
  cruiseAltitude,
  equipmentSuffix,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "cruiseAltitude",
      priority: 5,
    }),
  };

  try {
    // If the plane is RVSM capable then there's nothing to check
    if (isRVSMCapable) {
      result.data.status = "Information";
      result.data.message = `Plane is RVSM capable so no need to verify its altitude for RVSM compatibility.`;
      result.data.messageId = "RVSMCapable";
    }
    // Can't run check if there's no equipment suffix
    else if (!equipmentSuffix) {
      result.data.status = "Information";
      result.data.message = `No equipment suffix available so unable to verify altitude for RVSM compatibility.`;
      result.data.messageId = "noEquipmentSuffix";
    }
    // Plane isn't RVSM capable so make sure it isn't flying too high
    else if (cruiseAltitude >= 290) {
      result.data.status = "Error";
      result.data.message = `Plane is not RVSM capable and is flying at or above FL290.`;
      result.data.messageId = "nonRVSMAtOrAbove290";
      result.data.priority = 3;
    }
    // Plane isn't RVSM capable but altitude is fine
    else {
      result.data.status = "Information";
      result.data.message = `Plane is not RVSM capable but is flying below FL290.`;
      result.data.messageId = "nonRVSMBelow290";
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running verifyNonRVSMIsBelow290: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyNonRVSMIsBelow290: error`,
    };
  }

  return result;
}
