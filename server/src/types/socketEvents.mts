import { VatsimFlightPlan } from "../models/VatsimFlightPlan.mjs";

export interface ServerToClientEvents {
  vatsimFlightPlansUpdate: (flightPlans: VatsimFlightPlan[]) => void;
  airportNotFound: (airportCodes: string[]) => void;
  insecureAirportCode: (airportCodes: string[]) => void;
}

export interface ClientToServerEvents {
  watchAirports: (airportCodes: string[]) => void;
}
