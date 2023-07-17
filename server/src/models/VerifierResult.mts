import { Model, Schema, Types, model } from "mongoose";
import IVerifierResultDocument from "../interfaces/IVerifierResultDocument.mjs";

export interface IVerifierResult extends IVerifierResultDocument {}
export interface VerifierResultModelInterface extends Model<IVerifierResult> {}

const VerifierResultSchema = new Schema({
  flightPlanId: {
    type: Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["Ok", "Warning", "Error"],
    required: true,
  },
  verifier: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  extendedMessage: {
    type: [String],
    default: undefined,
  },
  flightPlanPart: {
    type: String,
    enum: [
      "callsign",
      "rawAircraftType",
      "equipmentCode",
      "departure",
      "arrival",
      "squawk",
      "isHeavy",
      "cruiseAltitude",
      "route",
    ],
    required: true,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
});

// Define the model
const VerifierResult: VerifierResultModelInterface = model<
  IVerifierResult,
  VerifierResultModelInterface
>("verifierresult", VerifierResultSchema);

// Export the model
export default VerifierResult;
