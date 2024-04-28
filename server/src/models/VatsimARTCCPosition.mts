import {
  getModelForClass,
  modelOptions,
  prop,
  type DocumentType,
  type ReturnModelType,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "artccpositions",
  },
})
export class VatsimARTCCPosition {
  @prop({ required: true, index: true, unique: false })
  name!: string;

  @prop({ required: true, type: () => [String], default: [] })
  positionCodes!: string[];

  public static async findByPositionCode(
    this: ReturnModelType<typeof VatsimARTCCPosition>,
    positionCode: string | undefined
  ): Promise<VatsimARTCCPositionDocument | null> {
    if (positionCode === undefined) {
      return null;
    }

    return await VatsimARTCCPositionModel.findOne({
      positionCodes: { $elemMatch: { $eq: positionCode } },
    });
  }
}

export const VatsimARTCCPositionModel = getModelForClass(VatsimARTCCPosition);
export type VatsimARTCCPositionDocument = DocumentType<VatsimARTCCPosition>;
