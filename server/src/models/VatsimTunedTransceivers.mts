import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "tunedtransceivers" } })
export class TunedTransceivers {
  @prop({ required: true })
  callsign!: string;

  @prop()
  com1?: number;

  @prop()
  com2?: number;
}

export const TunedTransceiversModel = getModelForClass(TunedTransceivers);
export type TunedTransceiversDocument = DocumentType<TunedTransceivers>;
