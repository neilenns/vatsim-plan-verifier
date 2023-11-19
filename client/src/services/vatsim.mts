import { IVatsimFlightPlan } from "../interfaces/IVatsimFlightPlan.mts";
import http from "../utils/http.mts";

export async function getVatsimFlightPlan(
  callsign: string
): Promise<IVatsimFlightPlan | undefined> {
  try {
    const response = await http.get(`vatsim/flightplan/${callsign}`);

    if (response.status === 200) {
      return response.data as IVatsimFlightPlan;
    } else {
      throw new Error("Failed to get flight plan");
    }
  } catch (error) {
    throw new Error("Failed to get flight plan");
  }
}
