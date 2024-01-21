import mainLogger from "../../logger.mjs";
import { CustomMessageModel, MessageTarget } from "../../models/CustomMessages.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import {
  VerifierResultDocument,
  VerifierResultModel,
  VerifierResultStatus,
} from "../../models/VerifierResult.mjs";
import { VerifierControllerMultiResult } from "../../types/verifierControllerResult.mjs";
import applyMustacheValues from "../../utils/mustache.mjs";

const verifierName = "checkForCustomAirportMessages";
const logger = mainLogger.child({ service: verifierName });

export default async function checkForCustomAirportMessages(
  flightPlan: FlightPlan
): Promise<VerifierControllerMultiResult> {
  // Set up the default result for a successful run of the verifier.
  let results: VerifierResultDocument[] = [];

  try {
    const customMessages = await CustomMessageModel.findByTarget(
      MessageTarget.Airport,
      flightPlan.departure
    );

    if (!customMessages || customMessages.length === 0) {
      results.push(
        new VerifierResultModel({
          flightPlanId: flightPlan._id,
          verifier: verifierName,
          flightPlanPart: "departure",
          priority: 5,
          status: VerifierResultStatus.INFORMATION,
          message: `No custom messages for ${flightPlan.departure}`,
          messageId: "noCustomMessages",
        })
      );
    }
    // Convert the custom messages to results
    else {
      results = await Promise.all(
        customMessages.map(async (customMessage) => {
          return new VerifierResultModel({
            flightPlanId: flightPlan._id,
            verifier: verifierName,
            flightPlanPart: "departure",
            status: "CustomMessage",
            priority: customMessage.priority,
            message: await applyMustacheValues(customMessage.message, flightPlan),
            messageId: customMessage.messageId,
          });
        })
      );
    }

    // Save all the results
    await Promise.all(
      results.map(async (result) => {
        await result.save();
      })
    );

    // Return all the results
    return {
      success: true,
      data: results,
    };
  } catch (error) {
    logger.error(`Error running checkForCustomAirportMessages: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForCustomAirportMessages: ${error}`,
    };
  }
}
