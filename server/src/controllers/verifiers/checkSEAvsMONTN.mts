import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
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
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  try {
    if (!routeParts || routeParts.length === 0) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `No route provided.`;
      result.messageId = "noRoute";
    } else if (SID !== "SEA8") {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `This test does not apply to flight plans that do not use the SEA8 departure.`;
      result.messageId = "notOnSEA";
    } else {
      // Check to see if any of the fixes in the route are in the list of fixes that mandate MONTN2.
      if (routeParts.some((part) => alwaysMONTN2Fixes.includes(part))) {
        result.status = VerifierResultStatus.ERROR;
        result.message = `Flight should be on the MONTN2 departure instead of SEA8.`;
        result.messageId = "useMONTN";
        result.priority = 3;
      }
      // Check to see if any of the fixes in the route are on the list that would be MONTN2 in south flow
      else if (routeParts.some((part) => southFlowMONTN2Fixes.includes(part))) {
        result.status = VerifierResultStatus.WARNING;
        result.message = `Flight should be on the MONTN2 departure if KSEA is in south flow.`;
        result.messageId = "southMONTN";
        result.priority = 3;
      }
      // Check to see if any of the fixes in the route should use MONTN2 if eastbound
      else if (routeParts.some((part) => eastboundMONTN2Fixes.includes(part))) {
        result.status = VerifierResultStatus.WARNING;
        result.message = `Flight should be on the MONTN2 departure if heading eastbound.`;
        result.messageId = "eastboundMONTN";
        result.priority = 3;
      }
      // Check to see if any of the fixes in the route should use MONTN2 if northbound
      else if (routeParts.some((part) => northboundMONTN2Fixes.includes(part))) {
        result.status = VerifierResultStatus.WARNING;
        result.message = `Flight should be on the MONTN2 departure if heading northbound and KSEA is in south flow.`;
        result.messageId = "northboundMONTN";
        result.priority = 3;
      } else {
        result.status = VerifierResultStatus.INFORMATION;
        result.message = `Flight should be on the SEA8 departure.`;
        result.messageId = "useSEA";
      }
    }
    // If the SID is SEA8 and there are at least 3 waypoints in the route, then check to see if
    // either the second or third waypoint are in the list of ones that mandate MONTN2.

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error running checkSEAvsMONTN: error`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkSEAvsMONTN: error`,
    };
  }
}
