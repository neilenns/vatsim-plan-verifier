import { plugin, prop } from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { type AircraftClass } from "./Aircraft.mjs";

export enum InitialPhrasingOptions {
  Unknown = "Unknown",
  Maintain = "Maintain",
  ClimbViaSid = "ClimbViaSid",
  ClimbViaSidExceptMaintain = "ClimbViaSidExceptMaintain",
  ClimbViaDepartureExceptMaintain = "ClimbViaDepartureExceptMaintain",
  SeeNote = "SeeNote",
}

export enum AirportFlow {
  Any = "ANY",
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
  Unknown = "UNKNOWN",
}

@plugin(SpeedGooseCacheAutoCleaner)
export class InitialAltitude {
  @prop({ enum: InitialPhrasingOptions, default: InitialPhrasingOptions.Unknown })
  InitialPhrasing?: InitialPhrasingOptions;

  @prop({ required: true, enum: AirportFlow, default: AirportFlow.Any })
  Flow!: AirportFlow;

  @prop({ required: true })
  Altitude!: number;

  @prop()
  ExpectInMinutes?: number;

  @prop()
  ExpectInMiles?: string;

  @prop()
  ExpectRequired?: boolean;

  @prop({ required: true })
  AircraftClass!: string;

  public static findMatching(
    initialAltitudes: InitialAltitude[],
    aircraftClass: AircraftClass,
    flow: AirportFlow
  ) {
    for (const initialAltitude of initialAltitudes) {
      const regex = new RegExp(initialAltitude.AircraftClass);

      // Find the first initial altitude that matches both the aircraft class and airport flow.
      if (
        regex.test(aircraftClass) &&
        (initialAltitude.Flow == AirportFlow.Any || initialAltitude.Flow === flow)
      ) {
        return initialAltitude;
      }
    }

    return null;
  }
}
