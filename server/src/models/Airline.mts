import { Model, Schema, model } from "mongoose";
import IAirlineDocument from "../interfaces/IAirlineDocument.mjs";

export interface IAirline extends IAirlineDocument {}
export interface AirlineModelInterface extends Model<IAirline> {
  findByAirlineCode(airlineCode: string): Promise<IAirline[]>;
}

const AirlineSchema = new Schema({
  airlineCode: { type: String, required: true, index: true },
  telephony: { type: String, required: true },
});

AirlineSchema.statics.findByAirlineCode = async function (airlineCode: string) {
  return this.find({ airlineCode: airlineCode });
};

// Define the model
const Airline: AirlineModelInterface = model<
  IAirlineDocument,
  AirlineModelInterface
>("airline", AirlineSchema);

Airline.on("index", (error) => {
  if (error) {
    console.error("Airline index error:", error);
  } else {
    console.log("Airline index created");
  }
});

// Export the model
export default Airline;
