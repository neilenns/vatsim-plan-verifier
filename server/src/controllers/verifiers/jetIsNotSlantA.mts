import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "jetIsNotSlantA";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function jetIsNotSlantA({
  _id,
  equipmentCode,
  equipmentSuffix,
  equipmentInfo,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      status: "Information",
      messageId: "jetIsNotSlantA",
      message: `${equipmentCode} with /${equipmentSuffix} is not /A.`,
      flightPlanPart: "rawAircraftType",
      priority: 5,
    }),
  };

  try {
    if (!equipmentInfo) {
      result.data.status = "Information";
      result.data.messageId = "unableToVerifyJetIsNotSlantANoAircraftInfo";
      result.data.message = `Unable to verify jet is not slant A because no aircraft info is available.`;
      result.data.priority = 5;
    }
    // Don't run the test on non-jet aircraft
    else if (equipmentInfo.engineType !== "J") {
      result.data.status = "Information";
      result.data.messageId = "unableToVerifJetIsNotSlantAEngineTypeNotJ";
      result.data.message = `Unable to verify jet is not slant A because the aircraft isn't a jet.`;
      result.data.priority = 5;
    }
    // The actual test
    else if (equipmentSuffix === "A" && equipmentInfo.engineType === "J") {
      result.data.status = "Warning";
      result.data.messageId = "jetIsSlantA";
      result.data.message = `${equipmentCode} with /A is almost certainly not correct.`;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running : error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running : error`,
    };
  }

  return result;
}
