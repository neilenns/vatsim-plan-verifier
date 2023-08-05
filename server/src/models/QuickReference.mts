import { prop, getModelForClass, modelOptions, ReturnModelType } from "@typegoose/typegoose";

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
  ): Promise<QuickReference | null> {
    return await this.findOne({ key });
  }
}

const QuickReferenceModel = getModelForClass(QuickReference);

export default QuickReferenceModel;
