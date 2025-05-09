import {
  getModelForClass,
  prop,
  type DocumentType,
  type ReturnModelType,
} from "@typegoose/typegoose";
import { AirportFlow } from "./InitialAltitude.mjs";

class EventReroute {
  @prop({ requried: true })
  departure!: string;

  @prop({ required: true, enum: AirportFlow, default: AirportFlow.Any })
  flow!: AirportFlow;

  @prop({ required: true })
  fix!: string;

  @prop({ required: false })
  departureFrequency?: string;

  @prop({ required: false })
  replacement?: string;

  @prop({ required: false, default: true })
  isActive!: boolean;

  public static async findEventReroutes(
    this: ReturnModelType<typeof EventReroute>,
    departure: string,
    flow: AirportFlow = AirportFlow.Any
  ): Promise<Array<DocumentType<EventReroute>> | null> {
    return await this.find({
      departure,
      flow: { $in: ["ANY", flow, undefined] },
      isActive: true,
    }).cacheQuery({
      ttl: 30,
    }); // 30 seconds
  }
}

export const EventRerouteModel = getModelForClass(EventReroute);
export type EventRerouteDocument = DocumentType<EventReroute>;
