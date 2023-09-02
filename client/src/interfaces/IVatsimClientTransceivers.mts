export interface ITransceiver {
  id: number;
  frequency: number;
  latDeg: number;
  lonDeg: number;
  heightMslM: number;
  heightAglM: number;
}

export interface IVatsimClientTransceivers {
  callsign: string;
  transceivers: ITransceiver[];
}
