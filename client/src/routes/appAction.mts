import { removeActiveFlightPlan } from "../services/activeFlightPlans.mts";

import type { ActionFunction } from "react-router-dom";

interface AppAction {
  getAccessTokenSilently: () => Promise<string>;
}

export const appAction =
  ({ getAccessTokenSilently }: AppAction): ActionFunction =>
  async ({ request }) => {
    const token = await getAccessTokenSilently();
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "removeFlightPlan") {
      const flightPlanId = formData.get("flightPlanId");

      await removeActiveFlightPlan(token, flightPlanId as string);
    }
  };
