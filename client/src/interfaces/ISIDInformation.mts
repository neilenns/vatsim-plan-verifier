export enum InitialPhrasingOptions {
  Unknown = "Unknown",
  Maintain = "Maintain",
  ClimbViaSid = "ClimbViaSid",
  ClimbViaSidExceptMaintain = "ClimbViaSidExceptMaintain",
  ClimbViaDepartureExceptMaintain = "ClimbViaDepartureExceptMaintain",
  SeeNote = "SeeNote",
}

export enum AirportFlow {
  Any = "ANY",
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
  Unknown = "UNKNOWN",
}

export interface IInitialAltitude {
  InitialPhrasing: InitialPhrasingOptions;
  Flow: AirportFlow;
  Altitude: number;
  AircraftClass: string;
  ExpectInMiles?: string;
  ExpectInMinutes?: number;
  ExpectRequired?: boolean;
}

export interface ISIDInformation {
  Telephony?: string;
  InitialAltitudes?: IInitialAltitude[];
  Charts?: Record<string, string>;
}
