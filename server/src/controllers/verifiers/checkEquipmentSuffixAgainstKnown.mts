import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "checkEquipmentSuffixAgainstKnown";

export default async function checkEquipmentSuffixAgainstKnown({
  _id,
  equipmentInfo,
  equipmentSuffix,
  equipmentCode,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "rawAircraftType",
      priority: 5,
    }),
  };

  try {
    // If there's no equipement info for the aircraft then don't bother running this verifier.
    if (!equipmentInfo) {
      result.data.status = "Information";
      result.data.message = `Unable to verify equipment suffix as no aircraft equipment info was available.`;
    }
    // If there's no equipment suffix on the flight plan then don't bother running this verifier. A different verifier checks for the presence of a suffix.
    else if (!equipmentSuffix) {
      result.data.status = "Information";
      result.data.message = `Unable to verify equipment suffix as the flight plan didn't provide an equipment suffix.`;
    }
    // Not all aircraft have common equipment suffixes. If that's the case for this aircraf then skip running the verifier.
    else if (!equipmentInfo.commonEquipmentSuffix) {
      result.data.status = "Information";
      result.data.message = `Unable to verify equipment suffix as there is no known common suffix available for ${equipmentCode}.`;
    }
    // This is the actual check this verifier is supposed to do.
    else if (equipmentInfo.commonEquipmentSuffix !== equipmentSuffix) {
      result.data.status = "Warning";
      result.data.message = `Equipment suffix ${equipmentSuffix} does not match the expected suffix for ${equipmentCode} (${equipmentInfo.commonEquipmentSuffix}).`;
      result.data.priority = 3;
    }
    // Success case is an information result since it is not useful to the controller to know that the suffix matches.
    else {
      result.data.status = "Information";
      result.data.message = `Equipment suffix ${equipmentSuffix} matches an expected suffix for ${equipmentCode}.`;
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running ${verifierName}: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error}`,
    };
  }

  return result;
}
