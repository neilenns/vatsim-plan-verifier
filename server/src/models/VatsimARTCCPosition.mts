import { getModelForClass, modelOptions, prop, type DocumentType } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "artccpositions",
  },
})
export class VatsimARTCCPosition {
  @prop({ required: true, index: true, unique: false })
  name!: string;

  @prop({ required: true, index: true, unique: true })
  positionCode!: string;
}

export const VatsimARTCCPositionModel = getModelForClass(VatsimARTCCPosition);
export type VatsimARTCCPositionDocument = DocumentType<VatsimARTCCPosition>;
