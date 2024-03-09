import { type FlightPlan } from "../models/FlightPlan.mjs";
import {type VerifierControllerMultiResult} from "./verifierControllerResult.mjs";
import type VerifierControllerResult from "./verifierControllerResult.mjs";

export type VerifierFunction = (
  flightPlan: FlightPlan,
  // Save result defaults to true in all the verifier functions. It gets set
  // to false when functions are called by verifyAll() to allow for bulk
  // saving the results afterwards as a performance improvement.
  saveResult?: boolean
) => Promise<VerifierControllerResult | VerifierControllerMultiResult>;

export interface Verifier {
  name: string;
  handler: VerifierFunction;
}
