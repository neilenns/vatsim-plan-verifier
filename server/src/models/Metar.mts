import {
  prop,
  getModelForClass,
  DocumentType,
  modelOptions,
  pre,
  defaultClasses,
} from "@typegoose/typegoose";
import { parseMetar, AltimeterUnit } from "metar-taf-parser";
import debug from "debug";

const logger = debug("plan-verifier:metarModel");

// Always strip the + off the route before saving
@pre<Metar>("save", function (next) {
  if (this.isModified("metar")) {
    const metar = parseMetar(this.metar);

    if (!metar.altimeter) {
      return;
    }

    metar.altimeter.unit === AltimeterUnit.HPa
      ? (this.altimeter = metar.altimeter.value * 0.029529983071445)
      : (this.altimeter = metar.altimeter.value);
  }
  next();
})
@modelOptions({ options: { customName: "metar" } })
export class Metar extends defaultClasses.TimeStamps {
  @prop({ required: true })
  icao!: string;

  @prop({ required: true })
  metar!: string;

  @prop({ required: true })
  source!: string;

  @prop({ required: false })
  altimeter?: number;

  public async isExpired(this: DocumentType<Metar>): Promise<boolean> {
    if (!(this.updatedAt instanceof Date)) return false;

    const currentTime = Date.now();
    const timeDifference = currentTime - this.updatedAt.getTime();
    // const cacheExpiryTime = 15 * 60 * 1000; // 15 minutes
    const cacheExpiryTime = 1 * 60 * 1000; // 1 minute

    if (timeDifference > cacheExpiryTime) {
      logger(`Cached metar for ${this.icao} is expired.`);
      return true;
    } else {
      logger(`Cached metar for ${this.icao} is still valid.`);
      return false;
    }
  }
}

export const MetarModel = getModelForClass(Metar);
export type MetarDocument = DocumentType<Metar>;
