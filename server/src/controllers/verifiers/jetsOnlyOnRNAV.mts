import { isDocument } from "@typegoose/typegoose";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "jetsOnlyOnRNAV";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function jetsOnlyOnRNAV({
  _id,
  equipmentInfo,
  SIDInformation,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  try {
    if (!isDocument(equipmentInfo) || !equipmentInfo.engineType) {
      result.data.status = "Information";
      result.data.message = "No engine type information found. Unable to verify jetsOnlyOnRNAV.";
      result.data.messageId = "noEngineTypeInformation";
      result.data.priority = 5;
    } else if (!isDocument(SIDInformation)) {
      result.data.status = "Information";
      result.data.message = "No SID information found. Unable to verify jetsOnlyOnRNAV.";
      result.data.messageId = "noSIDInformation";
      result.data.priority = 5;
    }
    // This is the test the verifier is supposed to do.
    else if (equipmentInfo.engineType !== "J" && SIDInformation.IsRNAV) {
      result.data.status = "Warning";
      result.data.message = `Aircraft has ${equipmentInfo.engineType} engines, but SID is RNAV. Verify the SID allows non-jet aircraft.`;
      result.data.messageId = "nonJetOnRNAV";
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.message = `Aircraft engine type is compatible with the SID.`;
      result.data.priority = 5;
      result.data.messageId = "engineTypeMatchesSID";
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running jetsOnlyOnRNAV: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running jetsOnlyOnRNAV: error`,
    };
  }

  return result;
}
