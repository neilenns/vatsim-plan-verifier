export enum InitialPhrasingOptions {
  Unknown = "Unknown",
  Maintain = "Maintain",
  ClimbViaSid = "ClimbViaSid",
  ClimbViaSidExceptMaintain = "ClimbViaSidExceptMaintain",
}

export default interface ISIDInformation {
  InitialPhrasing: InitialPhrasingOptions;
  ExpectInMinutes?: number;
  ExpectRequired?: boolean;
}
