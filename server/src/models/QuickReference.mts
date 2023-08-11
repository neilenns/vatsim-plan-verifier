import {
  prop,
  getModelForClass,
  modelOptions,
  ReturnModelType,
  DocumentType,
} from "@typegoose/typegoose";

@modelOptions({ options: { customName: "quickreference" } })
export class QuickReference {
  @prop({ required: true, unique: true })
  key!: string;

  @prop({ required: true })
  label!: string;

  @prop({ required: true })
  markdown!: string;

  public static async findByKey(
    this: ReturnModelType<typeof QuickReference>,
    key: string
  ): Promise<DocumentType<QuickReference> | null> {
    return await this.findOne({ key });
  }
}

export const QuickReferenceModel = getModelForClass(QuickReference);
export type QuickReferenceDocument = DocumentType<QuickReference>;
