export enum InitialPhrasingOptions {
  Unknown = "Unknown",
  Maintain = "Maintain",
  ClimbViaSid = "ClimbViaSid",
  ClimbViaSidExceptMaintain = "ClimbViaSidExceptMaintain",
  ClimbViaDepartureExceptMaintain = "ClimbViaDepartureExceptMaintain",
}

export default interface ISIDInformation {
  InitialPhrasing: InitialPhrasingOptions;
  ExpectInMinutes?: number;
  ExpectRequired?: boolean;
}
