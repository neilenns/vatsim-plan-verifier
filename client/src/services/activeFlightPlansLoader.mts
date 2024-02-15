import { ActionFunction } from "react-router-dom";
import AuthorizedAppAction from "../interfaces/AuthorizedAppAction.mts";
import { getActiveFlightPlans } from "./activeFlightPlans.mjs";

export const activeFlightPlansLoader =
  ({ getAccessTokenSilently }: AuthorizedAppAction): ActionFunction =>
  async () => {
    try {
      const token = await getAccessTokenSilently();
      const activeFlightPlans = await getActiveFlightPlans(token);

      return activeFlightPlans;
    } catch {
      return [];
    }
  };
