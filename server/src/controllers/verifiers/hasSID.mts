import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "hasSID";
const logger = mainLogger.child({ service: verifierName });

export default async function hasSID({
  _id,
  SID,
  departureAirportInfo,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
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

    const doc = await result.save();
    return {
      success: true,
      data: doc,
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
}
