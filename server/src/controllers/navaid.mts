import mainLogger from "../logger.mjs";
import { type NavaidDocument, NavaidModel } from "../models/Navaid.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "navaid" });

type NavaidResult = Result<NavaidDocument, "NavaidNotFound" | "UnknownError">;

export async function getNavaidById(id: string): Promise<NavaidResult> {
  try {
    const fetchedNavaid = await NavaidModel.findById(id);

    if (fetchedNavaid) {
      return { success: true, data: fetchedNavaid };
    } else {
      return {
        success: false,
        errorType: "NavaidNotFound",
        error: `Navaid ${id} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching navaid ${id}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching navaid ${id}: ${error.message}`,
    };
  }
}

export async function getNavaidByIdent(ident: string): Promise<NavaidResult> {
  try {
    const fetchedNavaid = await NavaidModel.findOne({ ident });

    if (fetchedNavaid) {
      return { success: true, data: fetchedNavaid };
    } else {
      return {
        success: false,
        errorType: "NavaidNotFound",
        error: `Navaid ${ident} not found.`,
      };
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error fetching navaid ${ident}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching navaid ${ident}: ${error.message}`,
    };
  }
}
