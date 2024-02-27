import debug from "debug";
import { ActionFunction } from "react-router-dom";
import AuthorizedAppAction from "../interfaces/AuthorizedAppAction.mts";
import {
  IQuickReference,
  IQuickReferenceListItem,
  IQuickReferenceLoaderData,
} from "../interfaces/IQuickReference.mts";
import Result from "../types/result.mts";
import http from "../utils/http.mts";

const logger = debug("plan-verifier:quickReferenceLoader");

export type QuickReferenceLoaderResult = Result<
  IQuickReferenceLoaderData,
  "QuickReferenceLoaderError"
>;

async function getQuickReferenceList(token: string): Promise<IQuickReferenceListItem[]> {
  try {
    const response = await http.authorized(token).get(`quickreferencelist`);

    if (response.status === 200) {
      return response.data as IQuickReferenceListItem[];
    } else {
      throw new Error("Failed to get list of quick references");
    }
  } catch (error) {
    throw new Error("Failed to get list of quick references");
  }
}

async function getQuickReference(token: string, key: string): Promise<IQuickReference> {
  try {
    const response = await http.authorized(token).get(`quickreference/${key}`);

    if (response.status === 200) {
      return response.data as IQuickReference;
    } else {
      throw new Error(`Failed to get quick reference for ${key}`);
    }
  } catch (error) {
    throw new Error("Failed to get quick reference");
  }
}

export const quickReferenceLoader =
  ({ getAccessTokenSilently }: AuthorizedAppAction): ActionFunction =>
  async ({ params }) => {
    const { key } = params;

    try {
      const token = await getAccessTokenSilently();
      const quickReferenceList = await getQuickReferenceList(token);

      if (!quickReferenceList) {
        throw new Error("Failed to get quick reference list");
      }

      if (key) {
        const quickReference = await getQuickReference(token, key);

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
