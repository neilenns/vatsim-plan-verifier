import { getModelForClass, prop, type DocumentType } from "@typegoose/typegoose";

export class VatsimController {
  @prop({ required: true, index: true })
  cid!: number;

  @prop({ required: true })
  name!: string;

  @prop({ required: false, default: "", index: true, unique: true })
  callsign!: string;

  @prop({ required: true })
  frequency!: string;

  @prop({ required: true })
  facility!: number;

  @prop({ required: true })
  rating!: number;

  @prop({ required: false, type: () => [String], default: [] })
  rawText!: string[];

  @prop({ required: true })
  logonTime!: Date;
}

export const VatsimControllerModel = getModelForClass(VatsimController);
export type VatsimControllerDocument = DocumentType<VatsimController>;
