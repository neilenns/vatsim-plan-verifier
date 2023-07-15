import { IFlightAwareAirport } from "./flightAware.mjs";

interface IFlightPlan extends Document {
  callsign: string;
  aircraftType: string;
  departure: string;
  arrival: string;
  departureAirportInfo?: IFlightAwareAirport;
  arrivalAirportInfo?: IFlightAwareAirport;
  squawk: string;
  cruiseAltitude: string;
  route: string;
}

export default IFlightPlan;
