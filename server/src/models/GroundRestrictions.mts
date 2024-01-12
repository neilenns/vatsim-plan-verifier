import {
  prop,
  getModelForClass,
  modelOptions,
  ReturnModelType,
  DocumentType,
} from "@typegoose/typegoose";

@modelOptions({ options: { customName: "groundRestriction" } })
class GroundRestriction {
  @prop({ required: true, index: true, unique: false })
  airportCode!: string;

  @prop({ type: () => [String], required: true, default: [] })
  equipmentCodes!: string[];

  @prop({ type: () => [Number], required: true, default: [] })
  groups!: Number[];

  @prop({ required: true })
  message!: string;

  // Finds all ground restrictions at an airport for a given equipment code or group.
  // Will return any records where either the equipment code or group is associated with
  // the ground restriction.
  public static async findByAirportAndFlightPlanDetails(
    this: ReturnModelType<typeof GroundRestriction>,
    airportCode: string,
    equipmentCode: string,
    group: number
  ): Promise<DocumentType<GroundRestriction>[] | null> {
    return await this.find({
      airportCode: airportCode,
      $or: [{ equipmentCodes: equipmentCode }, { groups: group }],
    });
  }
}

export const GroundRestrictionModel = getModelForClass(GroundRestriction);
export type GroundRestrictionDocument = DocumentType<GroundRestriction>;
