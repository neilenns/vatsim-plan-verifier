export enum ImportState {
  IMPORTED = "imported",
  NEW = "new",
  UPDATED = "updated",
}

export interface IVatsimFlightPlan {
  _id?: string;
  callsign?: string;
  isPrefile?: boolean;
  departure?: string;
  arrival?: string;
  departureTime?: string;
  EDCT?: string;
  importState?: ImportState;
  revision: number;
}
