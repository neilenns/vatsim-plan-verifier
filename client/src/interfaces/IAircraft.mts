import { Types } from "mongoose";

export default interface IAircraft {
  _id?: Types.ObjectId;
  equipmentCode: string;
  manufacturer: string;
  name: string;
  engineCount: number;
  engineType: "P" | "T" | "J";
  weightClass: "S" | "L" | "H" | "SUPER";
  cwt?: string;
  srsClass: string;
  maxCruiseSpeed?: number;
  commonEquipmentSuffix?: string;
  airplaneDesignGroup?: number;
  wingspan?: number;
  tailHeight?: number;
  aircraftClass: "S" | "L" | "J" | "U";
}
