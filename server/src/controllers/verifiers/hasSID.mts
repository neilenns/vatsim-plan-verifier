import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "hasSID";
const logger = mainLogger.child({ service: verifierName });

const hasSID: VerifierFunction = async function (
  { _id, SID, departureAirportInfo },
  saveResult = true
): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  try {
    // Check and see if the flight is out of an airport that's known to have no SIDs. If so
    // skip this verifier.
    if (
      isDocument(departureAirportInfo) &&
      isDocument(departureAirportInfo?.extendedAirportInfo) &&
      departureAirportInfo?.extendedAirportInfo?.hasSIDs === false
    ) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Departure airport has no SIDs.`;
      result.messageId = "airportHasNoSIDs";
      result.priority = 3;
    } else if (!SID) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Flight plan may not have a SID.`;
      result.messageId = "noSID";
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Flight plan appears to have a SID.`;
      result.messageId = "hasSID";
    }

    if (saveResult) {
      result = await result.save();
    }
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running hasSID: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasSID: ${error.message}`,
    };
  }
};

export default hasSID;
