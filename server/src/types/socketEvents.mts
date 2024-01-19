import { VatsimFlightPlanDocument } from "../models/VatsimFlightPlan.mjs";

export interface ServerToClientEvents {
  vatsimFlightPlansUpdate: (flightPlans: VatsimFlightPlanDocument[]) => void;
  airportNotFound: (airportCodes: string[]) => void;
  insecureAirportCode: (airportCodes: string[]) => void;
}

export interface ClientToServerEvents {
  watchAirports: (airportCodes: string[]) => void;
  watchEDCT: (departureCodes: string[], arrivalCodes: string[]) => void;
}
