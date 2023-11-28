export enum InitialPhrasingOptions {
  Unknown = "Unknown",
  Maintain = "Maintain",
  ClimbViaSid = "ClimbViaSid",
  ClimbViaSidExceptMaintain = "ClimbViaSidExceptMaintain",
  ClimbViaDepartureExceptMaintain = "ClimbViaDepartureExceptMaintain",
  SeeNote = "SeeNote",
}

export default interface ISIDInformation {
  InitialPhrasing: InitialPhrasingOptions;
  ExpectInMinutes?: number;
  ExpectInMiles?: string;
  ExpectRequired?: boolean;
  Telephony?: string;
  Charts?: {
    [key: string]: string;
  };
}
