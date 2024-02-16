import { FlightPlan } from "../models/FlightPlan.mjs";
import VerifierControllerResult, {
  VerifierControllerMultiResult,
} from "./verifierControllerResult.mjs";

export type VerifierFunction = (
  flightPlan: FlightPlan,
  saveResult?: boolean
) => Promise<VerifierControllerResult | VerifierControllerMultiResult>;

export type Verifier = {
  name: string;
  handler: VerifierFunction;
};
