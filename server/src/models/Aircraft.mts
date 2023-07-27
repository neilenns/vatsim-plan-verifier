import { Model, Schema, model } from "mongoose";
import IAircraftDocument from "../interfaces/IAircraftDocument.mjs";

export interface IAircraft extends IAircraftDocument {}
export interface AircraftModelInterface extends Model<IAircraft> {}

const AircraftSchema = new Schema(
  {
    equipmentCode: { type: String, required: true, index: true },
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    engineCount: { type: Number, required: true },
    engineType: { type: String, enum: ["P", "T", "J"], required: true },
    weightClass: { type: String, enum: ["S", "L", "H"], required: true },
    KPDXVfrAltitude: { type: Number, required: true },
    KPDXIfrAltitude: { type: Number, required: true },
    srsClass: { type: String, required: true },
    maxCruiseSpeed: { type: Number, required: false },
    commonEquipmentSuffixes: { type: [String], required: false },
  },
  { collection: "aircraft" }
);

// Define the model
const Aircraft: AircraftModelInterface = model<IAircraftDocument, AircraftModelInterface>(
  "aircraft",
  AircraftSchema
);

// Export the model
export default Aircraft;
