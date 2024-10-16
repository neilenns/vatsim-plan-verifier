import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "checkEquipmentSuffixAgainstKnown";
const logger = mainLogger.child({ service: verifierName });

const checkEquipmentSuffixAgainstKnown: VerifierFunction = async function (
  { _id, equipmentInfo, equipmentSuffix, equipmentCode },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "rawAircraftType",
    priority: 5,
  });

  try {
    // If there's no equipement info for the aircraft then don't bother running this verifier.
    if (equipmentInfo == null) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noAircraftInfoAvailable";
      result.message = `Unable to verify equipment suffix as no aircraft equipment info was available.`;
    }
    // If there's no equipment suffix on the flight plan then don't bother running this verifier. A different verifier checks for the presence of a suffix.
    else if (equipmentSuffix == null) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noEquipmentSuffixProvided";
      result.message = `Unable to verify equipment suffix as the flight plan didn't provide an equipment suffix.`;
    }
    // Not all aircraft have common equipment suffixes. If that's the case for this aircraf then skip running the verifier.
    else if (
      !isDocument(equipmentInfo) ||
      equipmentInfo.commonEquipmentSuffixes == null ||
      equipmentInfo.commonEquipmentSuffixes.length === 0
    ) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noCommonEquipmentSuffixAvailable";
      result.message = `Unable to verify equipment suffix as there is no known common suffix available for ${equipmentCode}.`;
    }
    // This is the actual check this verifier is supposed to do.
    else if (!equipmentInfo.commonEquipmentSuffixes.includes(equipmentSuffix)) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "equipmentSuffixDoesNotMatchKnown";
      result.message = `Equipment suffix ${equipmentSuffix} does not match the expected suffix for ${equipmentCode} (${equipmentInfo.commonEquipmentSuffixes.join(
        ", "
      )}).`;
      result.priority = 3;
    }
    // Success case is an information result since it is not useful to the controller to know that the suffix matches.
    else {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "equipmentSuffixMatchesKnown";
      result.message = `Equipment suffix ${equipmentSuffix} matches an expected suffix for ${equipmentCode}.`;
    }

    if (saveResult) {
      await result.save();
    }

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running ${verifierName}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error.message}`,
    };
  }
};

export default checkEquipmentSuffixAgainstKnown;
