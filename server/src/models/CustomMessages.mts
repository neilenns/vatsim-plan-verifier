import { prop, getModelForClass, modelOptions, ReturnModelType } from "@typegoose/typegoose";

export enum MessageTarget {
  Unknown = "Unknown",
  Airport = "Airport",
  Departure = "Departure",
}

@modelOptions({ options: { customName: "custommessage" } })
export class CustomMessage {
  @prop({ required: true })
  messageTarget!: MessageTarget;

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
    targetName: string
  ): Promise<CustomMessage[] | null> {
    return await this.find({ messageTarget, targetName });
  }
}

const CustomMessageModel = getModelForClass(CustomMessage);

export default CustomMessageModel;
