import { Document } from "mongoose";

export default interface IAircraftDocument extends Document {
  equipmentCode: string;
  manufacturer: string;
  name: string;
  engineCount: number;
  engineType: "P" | "T" | "J";
  weightClass: "S" | "L" | "H";
  srsClass: string;
  maxCruiseSpeed?: number;
  commonEquipmentSuffixes?: string[];
  aircraftClass?: "S" | "L" | "J" | "U"; // U = Unknown
}
