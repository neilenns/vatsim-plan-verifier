import { FlightPlan } from "../models/FlightPlan.mjs";
import VerifierControllerResult, {
  VerifierControllerMultiResult,
} from "./verifierControllerResult.mjs";

export type VerifierFunction = (
  flightPlan: FlightPlan,
  // Save result defaults to true in all the verifier functions. It gets set
  // to false when functions are called by verifyAll() to allow for bulk
  // saving the results afterwards as a performance improvement.
  saveResult?: boolean
) => Promise<VerifierControllerResult | VerifierControllerMultiResult>;

export type Verifier = {
  name: string;
  handler: VerifierFunction;
};
