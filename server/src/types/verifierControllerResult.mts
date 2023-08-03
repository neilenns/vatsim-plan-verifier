import { IVerifierResult } from "../models/VerifierResult.mjs";
import Result from "./result.mjs";

type VerifierControllerResult = Result<IVerifierResult, "UnknownError">;
export type VerifierControllerMultiResult = Result<IVerifierResult[], "UnknownError">;

export default VerifierControllerResult;
