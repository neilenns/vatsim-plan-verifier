import { isDocument } from "@typegoose/typegoose";
import debug from "debug";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "departureForLocalTime";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function departureForLocalTime({
  _id,
  SIDInformation,
  SID,
}: FlightPlan): Promise<VerifierControllerResult> {
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

      if (isValidResult.isValid) {
        result.data.status = VerifierResultStatus.INFORMATION;
        result.data.message = `SID is valid for the current time of day at the departure airport.`;
        result.data.messageId = "DepartureTimeIsValid";
      } else {
        result.data.status = VerifierResultStatus.ERROR;
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
          )}. Use one of these departures instead: ${SIDInformation.DepartureValidity?.Alternates.joinWithWord(
          "or"
        )}.`;
        result.data.messageId = "DepartureTimeIsNotValid";
        result.data.priority = 3;
      }
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running departureForLocalTime: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running departureForLocalTime: error`,
    };
  }

  return result;
}
