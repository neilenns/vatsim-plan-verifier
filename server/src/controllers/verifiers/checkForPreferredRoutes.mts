import { isDocument } from "@typegoose/typegoose";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { PreferredRouteModel } from "../../models/PreferredRoute.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { formatAltitude } from "../../utils.mjs";
import debug from "debug";

const verifierName = "checkForPreferredRoutes";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function checkForPreferredRoutes(
  flightPlan: FlightPlan
): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: flightPlan._id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  try {
    // Bail early if there's no aircraft information.
    if (!isDocument(flightPlan.equipmentInfo)) {
      result.data.status = "Information";
      result.data.messageId = "noAircraftInfoForPreferredRoute";
      result.data.message = `No aircraft information available for ${flightPlan.equipmentCode}, unable to check for preferred routes.`;
      result.data.priority = 5;

      await result.data.save();
      return result;
    }

    const preferredRoutes = await PreferredRouteModel.findByFlightPlan(flightPlan);

    // Bail early if there are no preferred routes
    if (preferredRoutes?.length === 0) {
      result.data.status = "Information";
      result.data.messageId = "noPreferredRoute";
      result.data.message = `No preferred route found for ${flightPlan.departure} to ${flightPlan.arrival}.`;
      result.data.priority = 5;

      await result.data.save();
      return result;
    }

    // Check for routes with a proper cruise altitude and speed
    const matchingRoutes = preferredRoutes.filter((route) => {
      return (
        isDocument(flightPlan.equipmentInfo) &&
        route.route === flightPlan.route &&
        flightPlan.cruiseAltitude >= route.minimumRequiredAltitude &&
        (flightPlan.equipmentInfo?.maxCruiseSpeed ?? 999) >= route.minimumRequiredSpeed
      );
    });

    if (matchingRoutes && matchingRoutes.length > 0) {
      result.data.status = "Ok";
      result.data.message = `Filed route is a preferred route and meets the minimum required altitude and speed.`;
      result.data.messageId = "preferredRoute";
      result.data.priority = 3;
    }
    // This means there is a route for the aircraft but either their speed or altitue is wrong.
    else {
      // Find routes that will work for the speed the aircraft can fly
      const validPreferredRoutes = preferredRoutes.filter((route) => {
        if (!isDocument(flightPlan.equipmentInfo)) {
          return false;
        }

        return (flightPlan.equipmentInfo?.maxCruiseSpeed ?? 999) >= route.minimumRequiredSpeed;
      });

      result.data.status = "Error";
      result.data.message = `Filed route does not match a preferred route at the minimum required altitude and speed. Should be one of:`;
      result.data.extendedMessage = validPreferredRoutes.map((route) => {
        return `${route.route} at ${formatAltitude(route.minimumRequiredAltitude)}${
          route.minimumRequiredSpeed ? ` and ${route.minimumRequiredSpeed} kts` : ""
        }${route.remarks ? ` (${route.remarks})` : ""}`;
      });

      result.data.messageId = "notPreferredRoute";
      result.data.priority = 1;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running checkForPreferredRoutes: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForPreferredRoutes: error`,
    };
  }

  return result;
}
