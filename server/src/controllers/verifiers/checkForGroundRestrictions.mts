import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { GroundRestrictionModel } from "../../models/GroundRestrictions.mjs";
import {
  VerifierResultDocument,
  VerifierResultModel,
  VerifierResultStatus,
} from "../../models/VerifierResult.mjs";
import { VerifierControllerMultiResult } from "../../types/verifierControllerResult.mjs";
import applyMustacheValues from "../../utils/mustache.mjs";

const verifierName = "checkForGroundRestrictions";
const logger = mainLogger.child({ service: verifierName });

export default async function checkForGroundRestrictions(
  flightPlan: FlightPlan
): Promise<VerifierControllerMultiResult> {
  // Set up the default result for a successful run of the verifier.
  let results: VerifierResultDocument[] = [];

  try {
    let group = 0;
    let wingspan = 0;
    let tailHeight = 0;
    // Get the group for the aircraft from the record, if there is equipment info available.
    if (isDocument(flightPlan.equipmentInfo)) {
      group = flightPlan.equipmentInfo?.airplaneDesignGroup ?? 0;
      wingspan = flightPlan.equipmentInfo?.wingspan ?? 0;
      tailHeight = flightPlan.equipmentInfo?.tailHeight ?? 0;
    }

    const groundRestrictions = await GroundRestrictionModel.findByAirportAndFlightPlanDetails(
      flightPlan.departure,
      flightPlan.equipmentCode ?? "",
      group,
      wingspan,
      tailHeight
    );

    if (!groundRestrictions || groundRestrictions.length === 0) {
      results.push(
        new VerifierResultModel({
          flightPlanId: flightPlan._id,
          verifier: verifierName,
          flightPlanPart: "rawAircraftType",
          priority: 5,
          status: VerifierResultStatus.INFORMATION,
          message: `No ground restrictions for ${flightPlan.departure} ${flightPlan.equipmentCode}`,
          messageId: "noGroundRestrictions",
        })
      );
    }
    // Convert the custom messages to results
    else {
      results = await Promise.all(
        groundRestrictions.map(async (customMessage) => {
          return new VerifierResultModel({
            flightPlanId: flightPlan._id,
            verifier: verifierName,
            flightPlanPart: "rawAircraftType",
            status: "CustomMessage",
            priority: 3,
            message: await applyMustacheValues(customMessage.message, flightPlan),
            messageId: "groundRestriction",
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
    logger.error(`Error running checkForGroundRestrictions: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForGroundRestrictions: ${error}`,
    };
  }
}
