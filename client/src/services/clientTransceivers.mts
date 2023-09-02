import { IVatsimClientTransceivers } from "../interfaces/IVatsimClientTransceivers.mts";
import http from "../utils/http.mts";

export async function getVatsimClientTransceivers(
  callsign: string
): Promise<IVatsimClientTransceivers | undefined> {
  try {
    const response = await http.get(`vatsim/transceivers/${callsign}`);

    if (response.status === 200) {
      return response.data as IVatsimClientTransceivers;
    } else {
      throw new Error("Failed to get transceiver data");
    }
  } catch (error) {
    throw new Error("Failed to get transceiver data");
  }
}
