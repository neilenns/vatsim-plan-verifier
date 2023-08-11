import { NavaidModel, NavaidDocument } from "../models/Navaid.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:navaidController");
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
    logger(`Error fetching navaid ${id}: ${error}`);

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
    logger(`Error fetching navaid ${ident}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching navaid ${ident}: ${error}`,
    };
  }
}
