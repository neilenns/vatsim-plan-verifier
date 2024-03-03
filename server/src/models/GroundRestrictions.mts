import {
  type DocumentType,
  type ReturnModelType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

@modelOptions({ options: { customName: "groundRestriction" } })
@plugin(SpeedGooseCacheAutoCleaner)
class GroundRestriction {
  @prop({ required: true, index: true, unique: false })
  airportCode!: string;

  @prop({ type: () => [String], required: true, default: [] })
  equipmentCodes!: string[];

  @prop({ type: () => [Number], required: true, default: [] })
  groups!: number[];

  // Default is a really big number so no wingspan will ever match when this isn't specified
  @prop({ required: false, default: 2000 })
  wingspanGreaterThan?: number;

  // Default is a really big number so no tail height will ever match when this isn't specified
  @prop({ required: false, default: 2000 })
  tailHeightGreaterThan?: number;

  @prop({ required: true })
  message!: string;

  // Finds all ground restrictions at an airport for a given equipment code or group.
  // Will return any records where either the equipment code or group is associated with
  // the ground restriction.
  public static async findByAirportAndFlightPlanDetails(
    this: ReturnModelType<typeof GroundRestriction>,
    airportCode: string,
    equipmentCode: string,
    group: number,
    wingspan: number,
    tailHeight: number
  ): Promise<Array<DocumentType<GroundRestriction>> | null> {
    return await this.find({
      airportCode,
      $or: [
        { equipmentCodes: equipmentCode },
        { groups: group },
        { wingspanGreaterThan: { $lt: wingspan } },
        { tailHeightGreaterThan: { $lt: tailHeight } },
      ],
    });
  }
}

export const GroundRestrictionModel = getModelForClass(GroundRestriction);
export type GroundRestrictionDocument = DocumentType<GroundRestriction>;
