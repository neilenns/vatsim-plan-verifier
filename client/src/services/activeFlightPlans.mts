import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";
import http from "../utils/http.mts";

export async function getActiveFlightPlans(): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.get(`activeFlightPlans`);

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
  flightPlanId: string
): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.post(`activeFlightPlans/${flightPlanId}`, {});

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
  flightPlanId: string,
  callsign?: string
): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.delete(`activeFlightPlans`, {
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
