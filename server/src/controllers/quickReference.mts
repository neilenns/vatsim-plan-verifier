import mainLogger from "../logger.mjs";
import { QuickReferenceDocument, QuickReferenceModel } from "../models/QuickReference.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "quickReference" });

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
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching quick reference ${key}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching quick reference ${key}: ${error.message}`,
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
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching quick references: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching quick references: ${error.message}`,
    };
  }
}
