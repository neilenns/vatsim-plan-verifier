import { Schema, model } from "mongoose";
import IAircraft from "../interfaces/aircraft.mjs";

const aircraftSchema = new Schema(
  {
    equipmentCode: { type: String, required: true },
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    engineCount: { type: Number, required: true },
    engineType: { type: String, enum: ["P", "T", "J"], required: true },
    weightClass: { type: String, enum: ["S", "L", "H"], required: true },
    KPDXVfrAltitude: { type: Number, required: true },
    KPDXIfrAltitude: { type: Number, required: true },
    srsClass: { type: String, required: true },
    maxCruiseSpeed: { type: Number, required: false },
    commonEquipmentSuffix: { type: String, required: false },
  },
  { collection: "aircraft" }
);

// Define the model
const Aircraft = model<IAircraft>("Aircraft", aircraftSchema);

// Export the model
export default Aircraft;
