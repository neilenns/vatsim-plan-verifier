import { CustomMessageModel, MessageTarget } from "../../models/CustomMessages.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import {
  VerifierResultDocument,
  VerifierResultModel,
  VerifierResultStatus,
} from "../../models/VerifierResult.mjs";
import { VerifierControllerMultiResult } from "../../types/verifierControllerResult.mjs";
import debug from "debug";
import applyMustacheValues from "../../utils/mustache.mjs";

const verifierName = "checkForCustomDepartureMessages";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function checkForCustomDepartureMessages(
  flightPlan: FlightPlan
): Promise<VerifierControllerMultiResult> {
  // Set up the default result for a successful run of the verifier.
  let results: VerifierResultDocument[] = [];

  try {
    if (!flightPlan.SID) {
      results.push(
        new VerifierResultModel({
          flightPlanId: flightPlan._id,
          verifier: verifierName,
          flightPlanPart: "route",
          priority: 5,
          status: VerifierResultStatus.INFORMATION,
          message: `No SID available for the route, skipping checking for custom messages.`,
          messageId: "noSID",
        })
      );
    } else {
      const customMessages = await CustomMessageModel.findByTarget(
        MessageTarget.Departure,
        flightPlan.SID,
        flightPlan.flow
      );

      if (!customMessages || customMessages.length === 0) {
        results.push(
          new VerifierResultModel({
            flightPlanId: flightPlan._id,
            verifier: verifierName,
            flightPlanPart: "route",
            priority: 5,
            status: VerifierResultStatus.INFORMATION,
            message: `No custom messages for ${flightPlan.SID}`,
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
              flightPlanPart: "route",
              status: "CustomMessage",
              priority: customMessage.priority,
              message: await applyMustacheValues(customMessage.message, flightPlan),
              messageId: customMessage.messageId,
            });
          })
        );
      }
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
    logger(`Error running checkForCustomDepartureMessages: error`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForCustomDepartureMessages: error`,
    };
  }
}
