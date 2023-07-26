import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";
import http from "../utils/http.mts";

const controllerId = "5f8a5fb7ebeb775e502b4e7f";

export async function getActiveFlightPlans(): Promise<IActiveFlightPlan[] | undefined> {
  try {
    // Send GET request to the Express.js route using Axios
    const response = await http.get(`activeFlightPlans/${controllerId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

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
    const response = await http.post(
      `activeFlightPlans/${controllerId}/${flightPlanId}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      }
    );

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
  flightPlanId: string
): Promise<IActiveFlightPlan[] | undefined> {
  try {
    const response = await http.delete(`activeFlightPlans/${controllerId}/${flightPlanId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
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
