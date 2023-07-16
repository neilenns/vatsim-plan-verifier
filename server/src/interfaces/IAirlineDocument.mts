import { Document } from "mongoose";

export default interface IAirlineDocument extends Document {
  airlineCode: string;
  telephony: string;
}
