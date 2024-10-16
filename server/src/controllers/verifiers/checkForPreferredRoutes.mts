import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { AirportFlow } from "../../models/InitialAltitude.mjs";
import { PreferredRouteModel } from "../../models/PreferredRoute.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";
import { formatAltitude } from "../../utils.mjs";

const verifierName = "checkForPreferredRoutes";
const logger = mainLogger.child({ service: verifierName });

const checkForPreferredRoutes: VerifierFunction = async function (flightPlan, saveResult = true) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: flightPlan._id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  try {
    // Bail early if there's no aircraft information.
    if (!isDocument(flightPlan.equipmentInfo)) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "noAircraftInfoForPreferredRoute";
      result.message = `No aircraft information available for ${flightPlan.equipmentCode}, unable to check for preferred routes.`;
      result.priority = 5;

      const doc = await result.save();
      return {
        success: true,
        data: doc,
      };
    }

    // Bail early if there's no equipment suffix
    if (flightPlan.equipmentSuffix == null) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "noEquipmentSuffixForPreferredRoute";
      result.message = `No equipment suffix available for ${flightPlan.equipmentCode}, unable to check for preferred routes.`;
      result.priority = 5;

      const doc = await result.save();
      return {
        success: true,
        data: doc,
      };
    }

    const preferredRoutes = await PreferredRouteModel.findByFlightPlan(flightPlan);

    // Bail early if there are no preferred routes
    if (preferredRoutes?.length === 0) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noPreferredRoute";
      result.message = `No preferred route found for ${flightPlan.departure} to ${flightPlan.arrival}.`;
      result.priority = 5;

      const doc = await result.save();
      return {
        success: true,
        data: doc,
      };
    }

    // Check for routes with a proper cruise altitude and speed
    const matchingRoutes = preferredRoutes.filter((route) => {
      return (
        isDocument(flightPlan.equipmentInfo) &&
        route.route === flightPlan.route &&
        ((route.flow ?? AirportFlow.Any) === AirportFlow.Any || route.flow === flightPlan.flow) &&
        flightPlan.cruiseAltitude >= route.minimumRequiredAltitude &&
        (flightPlan.equipmentInfo?.maxCruiseSpeed ?? 999) >= route.minimumRequiredSpeed
      );
    });

    if (matchingRoutes.length > 0) {
      result.status = VerifierResultStatus.OK;
      result.message = `Filed route is a preferred route and meets the minimum required altitude and speed.`;
      result.messageId = "preferredRoute";
      result.priority = 3;
    }
    // This means there is a route for the aircraft but either their speed, altitude, route, or flow is wrong.
    else {
      // Find routes that will work for the speed the aircraft can fly
      const validPreferredRoutes = preferredRoutes.filter((route) => {
        if (!isDocument(flightPlan.equipmentInfo)) {
          return false;
        }

        return (
          (flightPlan.equipmentInfo?.maxCruiseSpeed ?? 999) >= route.minimumRequiredSpeed &&
          ((route.flow ?? AirportFlow.Any) === AirportFlow.Any || route.flow === flightPlan.flow)
        );
      });

      result.status = VerifierResultStatus.ERROR;
      result.message = `Filed route does not match a preferred route at the minimum required altitude and speed. Should be one of:`;
      result.extendedMessage = validPreferredRoutes.map((route) => {
        return `${route.route} at ${formatAltitude(route.minimumRequiredAltitude)}${
          route.minimumRequiredSpeed !== 0 ? ` and ${route.minimumRequiredSpeed} kts` : ""
        }${route.remarks != null ? ` (${route.remarks})` : ""}`;
      });

      result.messageId = "notPreferredRoute";
      result.priority = 1;
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

    logger.error(`Error running checkForPreferredRoutes: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForPreferredRoutes: ${error.message}`,
    };
  }
};

export default checkForPreferredRoutes;
