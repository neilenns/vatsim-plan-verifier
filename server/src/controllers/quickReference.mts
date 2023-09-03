import { QuickReferenceModel, QuickReferenceDocument } from "../models/QuickReference.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:quickReference");

type QuickReferenceList = { key: string; label: string }[];

type QuickReferenceResult = Result<
  QuickReferenceDocument,
  "QuickReferenceNotFound" | "UnknownError"
>;
type QuickReferenceListResult = Result<QuickReferenceList, "UnknownError">;

export async function getQuickReference(key: string): Promise<QuickReferenceResult> {
  try {
    const quickReference = await QuickReferenceModel.findByKey(key);

    if (quickReference) {
      return { success: true, data: quickReference };
    } else {
      return {
        success: false,
        errorType: "QuickReferenceNotFound",
        error: `Quick reference ${key} not found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching quick reference ${key}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching quick reference ${key}: ${error}`,
    };
  }
}

export async function getQuickReferenceList(): Promise<QuickReferenceListResult> {
  try {
    const quickReference = await QuickReferenceModel.find({})
      .select({ key: 1, label: 1 })
      .sort({ label: 1 });

    if (quickReference) {
      return { success: true, data: quickReference };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `No quick references found.`,
      };
    }
  } catch (error) {
    logger(`Error fetching quick references: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching quick references: ${error}`,
    };
  }
}
