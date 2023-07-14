interface IFlightPlan extends Document {
  callsign: string;
  aircraftType: string;
  departure: string;
  arrival: string;
  squawk: string;
  cruiseAltitude: string;
  route: string;
}

export default IFlightPlan;
