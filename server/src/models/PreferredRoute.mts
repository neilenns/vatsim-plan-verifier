import {
  type DocumentType,
  type ReturnModelType,
  getModelForClass,
  isDocument,
  plugin,
  prop,
} from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { type FlightPlan } from "./FlightPlan.mjs";
import { AirportFlow } from "./InitialAltitude.mjs";

@plugin(SpeedGooseCacheAutoCleaner)
class PreferredRoute {
  @prop({ required: true, index: true })
  departure!: string;

  @prop({ required: true, index: true })
  arrival!: string;

  @prop({ required: true })
  route!: string;

  @prop({ required: true })
  minimumRequiredAltitude!: number;

  @prop({ required: true })
  minimumRequiredSpeed!: number;

  @prop({ type: String, required: true })
  equipmentSuffixes!: string;

  @prop({ type: String, required: true })
  engineTypes!: string;

  @prop({ type: String })
  remarks?: string;

  @prop({ required: true, enum: AirportFlow, default: AirportFlow.Any })
  flow!: AirportFlow;

  public static async findByFlightPlan(
    this: ReturnModelType<typeof PreferredRoute>,
    flightPlan: FlightPlan
  ): Promise<Array<DocumentType<PreferredRoute>>> {
    if (!isDocument(flightPlan.equipmentInfo)) {
      return [];
    }
    return this.aggregate([
      {
        $match: {
          departure: flightPlan.departure,
          arrival: flightPlan.arrival,
          $and: [
            {
              $expr: {
                $regexMatch: {
                  input: flightPlan.equipmentSuffix,
                  regex: "$equipmentSuffixes",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: flightPlan.equipmentInfo?.engineType,
                  regex: "$engineTypes",
                },
              },
            },
          ],
        },
      },
    ]);
  }
}

export const PreferredRouteModel = getModelForClass(PreferredRoute);
export type PreferredRouteDocument = DocumentType<PreferredRoute>;
