import { isDocument } from "@typegoose/typegoose";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "hasSID";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function hasSID({
  _id,
  SID,
  departureAirportInfo,
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
    // Check and see if the flight is out of an airport that's known to have no SIDs. If so
    // skip this verifier.
    if (
      isDocument(departureAirportInfo) &&
      isDocument(departureAirportInfo?.extendedAirportInfo) &&
      departureAirportInfo?.extendedAirportInfo?.hasSIDs === false
    ) {
      result.data.status = "Information";
      result.data.message = `Departure airport has no SIDs.`;
      result.data.messageId = "airportHasNoSIDs";
      result.data.priority = 3;
    }
    // This is the test the verifier is supposed to do.
    else if (!SID) {
      result.data.status = "Warning";
      result.data.message = `Flight plan may not have a SID.`;
      result.data.messageId = "noSID";
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.message = `Flight plan appears to have a SID.`;
      result.data.messageId = "hasSID";
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running hasSID: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasSID: error`,
    };
  }

  return result;
}
