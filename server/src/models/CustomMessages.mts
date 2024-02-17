import {
  DocumentType,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { AirportFlow } from "./InitialAltitude.mjs";

export enum MessageTarget {
  Unknown = "Unknown",
  Airport = "Airport",
  Departure = "Departure",
}

@modelOptions({ options: { customName: "custommessage" } })
@plugin(SpeedGooseCacheAutoCleaner)
class CustomMessage {
  @prop({ required: true })
  messageTarget!: MessageTarget;

  @prop({ required: true, enum: AirportFlow, default: AirportFlow.Any })
  flow!: AirportFlow;

  @prop({ required: true })
  targetName!: string;

  @prop({ required: true })
  message!: string;

  @prop({ required: true })
  messageId!: string;

  @prop({ default: 3 })
  priority?: number;

  public static async findByTarget(
    this: ReturnModelType<typeof CustomMessage>,
    messageTarget: MessageTarget,
    targetName: string,
    flow: AirportFlow = AirportFlow.Any
  ): Promise<DocumentType<CustomMessage>[] | null> {
    return await this.find({ messageTarget, targetName, flow: { $in: ["ANY", flow, undefined] } });
  }
}

export const CustomMessageModel = getModelForClass(CustomMessage);
export type CustomMessageDocument = DocumentType<CustomMessage>;
