import {
  type DocumentType,
  type ReturnModelType,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

export enum AircraftClass {
  S = "S",
  L = "L",
  J = "J",
  U = "U",
}

@modelOptions({
  options: { customName: "aircraft" },
  schemaOptions: {
    collection: "aircraft",
  },
})
export class Aircraft {
  @prop({ required: true, index: true })
  equipmentCode!: string;

  @prop({ required: true })
  manufacturer!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  engineCount!: number;

  @prop({ required: true, enum: ["P", "T", "J"] })
  engineType!: string;

  @prop({ required: true, enum: ["S", "L", "H", "SUPER"] })
  weightClass!: string;

  @prop({ required: false })
  cwt?: string;

  @prop({ required: true })
  srsClass!: string;

  @prop({ required: false })
  maxCruiseSpeed?: number;

  @prop({ required: false, type: () => [String] })
  commonEquipmentSuffixes?: string[];

  @prop({ required: true, enum: AircraftClass, default: AircraftClass.U })
  aircraftClass!: AircraftClass;

  @prop({ required: false, min: 1, max: 6 })
  airplaneDesignGroup?: number;

  @prop({ required: false })
  wingspan?: number;

  @prop({ required: false })
  tailHeight?: number;

  public get isHeavy(): boolean {
    return this.weightClass === "H";
  }

  public get isSuper(): boolean {
    return this.weightClass === "SUPER";
  }

  // Finds all aircraft whose name contains the specified name
  public static async findByName(
    this: ReturnModelType<typeof Aircraft>,
    name: string
  ): Promise<AircraftDocument[]> {
    return await this.find({ name: { $regex: name, $options: "i" } }).exec();
  }
}

export const AircraftModel = getModelForClass(Aircraft);
export type AircraftDocument = DocumentType<Aircraft>;
