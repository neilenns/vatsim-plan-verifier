import { Types } from "mongoose";

export default interface IAircraft {
  _id?: Types.ObjectId;
  equipmentCode: string;
  manufacturer: string;
  name: string;
  engineCount: number;
  engineType: "P" | "T" | "J";
  weightClass: "S" | "L" | "H";
  srsClass: string;
  maxCruiseSpeed?: number;
  commonEquipmentSuffix?: string;
}
