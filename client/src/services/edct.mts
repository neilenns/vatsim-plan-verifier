import { DateTime } from "luxon";
import { IVatsimFlightPlan } from "../interfaces/IVatsimFlightPlan.mts";
import http from "../utils/http.mts";

export async function updateEdct(
  _id: string | undefined,
  EDCT: DateTime
): Promise<IVatsimFlightPlan | undefined> {
  if (!_id) {
    return;
  }

  try {
    const response = await http.put(`vatsim/flightPlans/edct`, {
      _id,
      EDCT: EDCT.toISO(),
    });

    if (response.status === 200) {
      return response.data as IVatsimFlightPlan;
    } else {
      throw new Error("Failed to update EDCT");
    }
  } catch (error) {
    throw new Error("Failed to update EDCT");
  }
}
