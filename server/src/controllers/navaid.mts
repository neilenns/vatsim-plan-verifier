import mainLogger from "../logger.mjs";
import { NavaidDocument, NavaidModel } from "../models/Navaid.mjs";
import Result from "../types/result.mjs";

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
  } catch (error) {
    logger.error(`Error fetching navaid ${id}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching navaid ${id}: ${error}`,
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
  } catch (error) {
    logger.error(`Error fetching navaid ${ident}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching navaid ${ident}: ${error}`,
    };
  }
}
