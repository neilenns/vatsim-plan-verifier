export default interface IAircraft {
  equipmentCode: string;
  manufacturer: string;
  name: string;
  engineCount: number;
  engineType: "P" | "T" | "J";
  weightClass: "S" | "L" | "H";
  KPDXVfrAltitude: number;
  KPDXIfrAltitude: number;
  srsClass: string;
  maxCruiseSpeed?: number;
  commonEquipmentSuffix?: string;
}
