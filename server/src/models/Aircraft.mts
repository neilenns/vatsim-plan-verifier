import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";

@modelOptions({
  options: { customName: "aircraft" },
  schemaOptions: {
    collection: "aircraft",
  },
})
class AircraftClass {
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

  @prop({ required: true, enum: ["S", "L", "H"] })
  weightClass!: string;

  @prop({ required: true })
  srsClass!: string;

  @prop({ required: false })
  maxCruiseSpeed?: number;

  @prop({ required: false, type: () => [String] })
  commonEquipmentSuffixes?: string[];

  @prop({ required: false, enum: ["S", "L", "J", "U"] })
  aircraftClass?: string;
}

export const AircraftModel = getModelForClass(AircraftClass);
export type AircraftDocument = DocumentType<AircraftClass>;
