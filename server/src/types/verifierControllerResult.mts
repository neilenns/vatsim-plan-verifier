import { type VerifierResultDocument } from "../models/VerifierResult.mjs";
import type Result from "./result.mjs";

type VerifierControllerResult = Result<VerifierResultDocument, "UnknownError">;
export type VerifierControllerMultiResult = Result<VerifierResultDocument[], "UnknownError">;

export default VerifierControllerResult;
