import { AxiosError } from "axios";
import { IVatsimClientTransceivers } from "../interfaces/IVatsimClientTransceivers.mts";
import http from "../utils/http.mts";

export async function getVatsimClientTransceivers(
  token: string,
  callsign: string
): Promise<IVatsimClientTransceivers | undefined> {
  try {
    const response = await http.authorized(token).get(`vatsim/transceivers/${callsign}`);

    if (response.status === 200) {
      return response.data as IVatsimClientTransceivers;
    } else {
      throw new Error("Failed to get transceiver data");
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 404) {
      throw new Error(`Callsign ${callsign} not found`);
    }
    throw new Error("Failed to get transceiver data");
  }
}
