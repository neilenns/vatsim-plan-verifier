import {
  DocumentType,
  getModelForClass,
  isDocument,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import { find } from "geo-tz";
import { DateTime } from "luxon";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { AirportInfoModel } from "./AirportInfo.mjs";
import { AirportFlow, InitialAltitude } from "./InitialAltitude.mjs";

export class DepartureValidity {
  @prop({ required: true })
  StartTime!: number;

  @prop({ required: true })
  EndTime!: number;

  @prop({ required: true, type: () => [String] })
  Alternates!: string[];
}

export class IsValidResult {
  isValid?: boolean;
  localTime?: number;
  localTimeZone?: string;
}

@modelOptions({
  options: { customName: "departure" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(SpeedGooseCacheAutoCleaner)
export class Departure {
  @prop({ required: true })
  AirportCode!: string;

  @prop({ required: true })
  SID!: string;

  @prop({ required: true })
  Telephony!: string;

  @prop({ required: true, type: [String] })
  Fixes!: string[];

  @prop({ default: false })
  IsRNAV!: boolean;

  @prop({ type: () => [InitialAltitude], default: [] })
  InitialAltitudes!: InitialAltitude[];

  @prop({ type: DepartureValidity })
  DepartureValidity?: DepartureValidity;

  @prop({ type: String })
  Charts?: Map<string, string>;

  @prop({ required: true, enum: AirportFlow, default: AirportFlow.Any })
  Flow!: AirportFlow;

  // Returns true if the departure is valid given its start and end times and the current
  // local time at the departure's airport.
  public async isValid(): Promise<IsValidResult> {
    // If there's no specific departure validity for the SID then assume it is always valid.
    if (!this.DepartureValidity) {
      return {
        isValid: true,
      };
    }

    // Look up the departure airport in the database so the lat/long can be used to get the local
    // timezone.
    const airportInfo = await AirportInfoModel.findOne({
      airportCode: this.AirportCode,
    }).cacheQuery({ ttl: 60 * 10 }); // 10 minutes

    // If for some reason airport info can't be found or there's no lat/long info things are really whack
    //  and just say the SID is valid anyway.
    if (!isDocument(airportInfo) || !airportInfo.latitude || !airportInfo.longitude) {
      return {
        isValid: true,
      };
    }

    const timezoneName = find(airportInfo.latitude, airportInfo.longitude)?.[0];

    // If no timezone could be found then assume the SID is valid anyway.
    if (!timezoneName) {
      return {
        isValid: true,
      };
    }

    // Finally able to do the actual calculation
    const localTime = DateTime.local().setZone(timezoneName);

    const currentTime = localTime.hour * 100 + localTime.minute;
    let isValid: boolean;

    if (this.DepartureValidity.StartTime <= this.DepartureValidity.EndTime) {
      // No day boundary crossing
      isValid =
        currentTime >= this.DepartureValidity.StartTime &&
        currentTime <= this.DepartureValidity.EndTime;
    } else {
      // Day boundary crossing, e.g., 2200 to 0600
      isValid =
        currentTime >= this.DepartureValidity.StartTime ||
        currentTime <= this.DepartureValidity.EndTime;
    }

    return {
      isValid: isValid,
      localTime: currentTime,
      localTimeZone: timezoneName,
    };
  }
}

export const DepartureModel = getModelForClass(Departure);
export type DepartureDocument = DocumentType<Departure>;
