import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";
import http from "../utils/http.mts";

export async function getActiveFlightPlans(
  token: string
): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.authorized(token).get(`activeFlightPlans`);

    if (response.status === 200) {
      return response.data as IActiveFlightPlan[];
    } else {
      throw new Error("Failed to get active flight plans");
    }
  } catch (error) {
    throw new Error("Failed to get active flight plans");
  }
}

export async function addActiveFlightPlan(
  token: string,
  flightPlanId: string,
  callsign?: string
): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.authorized(token).post(`activeFlightPlans`, {
      flightPlanId,
      callsign,
    });

    if (response.status === 200) {
      return response.data as IActiveFlightPlan[];
    } else {
      throw new Error("Failed to add active flight plan");
    }
  } catch (error) {
    throw new Error("Failed to add active flight plan");
  }
}

export async function removeActiveFlightPlan(
  token: string,
  flightPlanId: string,
  callsign?: string
): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.authorized(token).delete(`activeFlightPlans`, {
      data: {
        flightPlanId,
        callsign,
      },
    });

    if (response.status === 200) {
      return response.data as IActiveFlightPlan[];
    } else {
      throw new Error("Failed to remove active flight plan");
    }
  } catch (error) {
    throw new Error("Failed to remove active flight plan");
  }
}
