import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";
import type VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { AirportFlow } from "../../models/InitialAltitude.mjs";

const verifierName = "departureForLocalTime";
const logger = mainLogger.child({ service: verifierName });

const departureForLocalTime: VerifierFunction = async function (
  { _id, SIDInformation, SID, flow },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResultModel({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  try {
    if (!isDocument(SIDInformation)) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `No SID information available for the route, skipping departure validity verification.`;
      result.data.messageId = "NoSIDInformation";
    } else {
      const isValidResult = await SIDInformation.isValid();

      if ((SIDInformation.Flow ?? AirportFlow.Any) !== flow) {
        result.data.status = VerifierResultStatus.INFORMATION;
        result.data.message = `SID isn't applicable for the current flow.`;
        result.data.messageId = "SIDNotApplicableForFlow";
      } else if (isValidResult.isValid === true) {
        result.data.status = VerifierResultStatus.INFORMATION;
        result.data.message = `SID is valid for the current time of day at the departure airport.`;
        result.data.messageId = "DepartureTimeIsValid";
      } else {
        result.data.status = VerifierResultStatus.WARNING;
        result.data.message = `Departure ${SID} is only valid from ${
          SIDInformation.DepartureValidity?.StartTime
        } to ${SIDInformation.DepartureValidity?.EndTime.toString().padStart(
          4,
          "0"
        )} but the departure's local time is ${isValidResult.localTime
          ?.toString()
          .padStart(
            4,
            "0"
          )}. Depending on airport flow consider one of these departures instead: ${SIDInformation.DepartureValidity?.Alternates.joinWithWord(
          "or"
        )}.`;
        result.data.messageId = "DepartureTimeIsNotValid";
        result.data.priority = 3;
      }
    }

    if (saveResult) {
      await result.data.save();
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running departureForLocalTime: ${error.message}`, error);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running departureForLocalTime: ${error.message}`,
    };
  }

  return result;
};

export default departureForLocalTime;
