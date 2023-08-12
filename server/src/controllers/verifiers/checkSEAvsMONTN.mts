import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "checkSEAvsMONTN";
const logger = debug(`plan-verifier:${verifierName}`);

const alwaysMONTN2Fixes = ["NORMY", "ZADON"];
const southFlowMONTN2Fixes = ["ALPSE", "PAE"];
const eastboundMONTN2Fixes = ["V2", "V298", "V120", "J12", "J70", "J90"];
const northboundMONTN2Fixes = ["V23", "J5", "J503"];

export default async function checkSEAvsMONTN({
  _id,
  SID,
  routeParts,
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
    if (!routeParts || routeParts.length === 0) {
      result.data.status = "Information";
      result.data.message = `No route provided.`;
      result.data.messageId = "noRoute";
    } else if (SID !== "SEA8") {
      result.data.status = "Information";
      result.data.message = `This test does not apply to flight plans that do not use the SEA8 departure.`;
      result.data.messageId = "notOnSEA";
    } else {
      // Check to see if any of the fixes in the route are in the list of fixes that mandate MONTN2.
      if (routeParts.some((part) => alwaysMONTN2Fixes.includes(part))) {
        result.data.status = "Error";
        result.data.message = `Flight should be on the MONTN2 departure instead of SEA8.`;
        result.data.messageId = "useMONTN";
        result.data.priority = 3;
      }
      // Check to see if any of the fixes in the route are on the list that would be MONTN2 in south flow
      else if (routeParts.some((part) => southFlowMONTN2Fixes.includes(part))) {
        result.data.status = "Warning";
        result.data.message = `Flight should be on the MONTN2 departure if KSEA is in south flow.`;
        result.data.messageId = "southMONTN";
        result.data.priority = 3;
      }
      // Check to see if any of the fixes in the route should use MONTN2 if eastbound
      else if (routeParts.some((part) => eastboundMONTN2Fixes.includes(part))) {
        result.data.status = "Warning";
        result.data.message = `Flight should be on the MONTN2 departure if heading eastbound.`;
        result.data.messageId = "eastboundMONTN";
        result.data.priority = 3;
      }
      // Check to see if any of the fixes in the route should use MONTN2 if northbound
      else if (routeParts.some((part) => northboundMONTN2Fixes.includes(part))) {
        result.data.status = "Warning";
        result.data.message = `Flight should be on the MONTN2 departure if heading northbound and KSEA is in south flow.`;
        result.data.messageId = "northboundMONTN";
        result.data.priority = 3;
      } else {
        result.data.status = "Information";
        result.data.message = `Flight should be on the SEA8 departure.`;
        result.data.messageId = "useSEA";
      }
    }
    // If the SID is SEA8 and there are at least 3 waypoints in the route, then check to see if
    // either the second or third waypoint are in the list of ones that mandate MONTN2.

    await result.data.save();
  } catch (error) {
    logger(`Error running checkSEAvsMONTN: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkSEAvsMONTN: error`,
    };
  }

  return result;
}
