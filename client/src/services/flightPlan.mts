import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import http from "../utils/http.mts";

export async function storeFlightPlan(
  token: string,
  flightPlan: IFlightPlan
): Promise<IFlightPlan> {
  try {
    const response = await http.authorized(token).post("flightPlan", flightPlan);

    if (response.status === 201) {
      return response.data as IFlightPlan;
    } else {
      throw new Error("Failed to save flight plan");
    }
  } catch (error) {
    throw new Error("Failed to save flight plan");
  }
}

export async function getFlightPlan(token: string, id: string): Promise<IFlightPlan | undefined> {
  try {
    const response = await http.authorized(token).get(`flightPlan/${id}`);

    if (response.status === 200) {
      return response.data as IFlightPlan;
    } else {
      throw new Error("Failed to get flight plan");
    }
  } catch (error) {
    throw new Error("Failed to get flight plan");
  }
}

export async function importFlightPlan(
  token: string,
  callsign: string
): Promise<IFlightPlan | undefined> {
  try {
    const response = await http.authorized(token).post(`flightPlan/import`, { callsign });

    if (response.status === 200) {
      return response.data as IFlightPlan;
    } else {
      throw new Error("Failed to get flight plan");
    }
  } catch (error) {
    throw new Error("Failed to get flight plan");
  }
}
