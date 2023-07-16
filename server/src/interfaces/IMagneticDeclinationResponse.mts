export default interface MagneticVariationResponse {
  result: MagneticVariationData[];
  model: string;
  units: MagneticVariationUnits;
  version: string;
}

export interface MagneticVariationData {
  date: number;
  elevation: number;
  declination: number;
  latitude: number;
  declination_sv: number;
  declination_uncertainty: number;
  longitude: number;
}

export interface MagneticVariationUnits {
  elevation: string;
  declination: string;
  declination_sv: string;
  latitude: string;
  declination_uncertainty: string;
  longitude: string;
}
