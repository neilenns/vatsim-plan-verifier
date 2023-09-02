import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";

export class Transceiver {
  @prop({ required: true })
  id!: number;

  @prop({ requred: true })
  frequency!: number;

  @prop({ requred: true })
  latDeg!: number;

  @prop({ requred: true })
  lonDeg!: number;

  @prop({ requred: true })
  heightMslM!: number;

  @prop({ requred: true })
  heightAglM!: number;
}

@modelOptions({ options: { customName: "tunedtransceivers" } })
export class TunedTransceivers {
  @prop({ required: true })
  callsign!: string;

  @prop({ type: Transceiver })
  transceivers!: Transceiver[];
}

export const TunedTransceiversModel = getModelForClass(TunedTransceivers);
export type TunedTransceiversDocument = DocumentType<TunedTransceivers>;
