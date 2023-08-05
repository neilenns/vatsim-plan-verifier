import { LoaderFunction } from "react-router-dom";
import http from "../utils/http.mts";
import {
  IQuickReference,
  IQuickReferenceListItem,
  IQuickReferenceLoaderData,
} from "../interfaces/IQuickReference.mts";
import debug from "debug";
import Result from "../types/result.mts";

const logger = debug("plan-verifier:quickReferenceLoader");

export type QuickReferenceLoaderResult = Result<
  IQuickReferenceLoaderData,
  "QuickReferenceLoaderError"
>;

async function getQuickReferenceList(): Promise<IQuickReferenceListItem[]> {
  try {
    const response = await http.get(`quickreferencelist`);

    if (response.status === 200) {
      return response.data as IQuickReferenceListItem[];
    } else {
      throw new Error("Failed to get list of quick references");
    }
  } catch (error) {
    throw new Error("Failed to get list of quick references");
  }
}

async function getQuickReference(key: string): Promise<IQuickReference> {
  try {
    const response = await http.get(`quickreference/${key}`);

    if (response.status === 200) {
      return response.data as IQuickReference;
    } else {
      throw new Error(`Failed to get quick reference for ${key}`);
    }
  } catch (error) {
    throw new Error("Failed to get quick reference");
  }
}

export const quickReferenceLoader: LoaderFunction = async ({ params }) => {
  const { key } = params;

  try {
    const quickReferenceList = await getQuickReferenceList();

    if (!quickReferenceList) {
      throw new Error("Failed to get quick reference list");
    }

    if (key) {
      const quickReference = await getQuickReference(key);

      if (!quickReference) {
        throw new Error(`Failed to get quick reference for ${key}`);
      }

      return {
        success: true,
        data: {
          entries: quickReferenceList,
          markdown: quickReference.markdown,
        },
      } as QuickReferenceLoaderResult;
    } else {
      return {
        success: true,
        data: {
          entries: quickReferenceList,
        },
      };
    }
  } catch (err) {
    const error = err as Error;
    logger(`Error fetching quick reference ${key ?? ""}: ${error.message}`);
    return {
      success: false,
      errorType: "QuickReferenceLoaderError",
      error: `Error fetching quick reference ${key ?? ""}`,
    } as QuickReferenceLoaderResult;
  }
};
