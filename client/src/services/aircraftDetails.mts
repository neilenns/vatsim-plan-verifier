import { AxiosError } from "axios";
import http from "../utils/http.mts";
import IAircraft from "../interfaces/IAircraft.mts";

export async function getAircraftByName(name: string): Promise<IAircraft[] | undefined> {
  try {
    const response = await http.get(`aircraft/name/${name}`);

    if (response.status === 200) {
      return response.data as IAircraft[];
    } else {
      throw new Error("Failed to get transceiver data");
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 404) {
      throw new Error(`Aircraft ${name} not found`);
    }
    throw new Error("Failed to get aircraft data");
  }
}
