interface Transceiver {
  id: number;
  frequency: number;
  latDeg: number;
  lonDeg: number;
  heightMslM: number;
  heightAglM: number;
}

interface TunedTransceivers {
  callsign: string;
  transceivers: Transceiver[];
}
