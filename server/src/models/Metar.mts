import {
  DocumentType,
  defaultClasses,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { AltimeterUnit, parseMetar } from "metar-taf-parser";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "metar" });

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
    const cacheExpiryTime = 15 * 60 * 1000; // 15 minutes
    // const cacheExpiryTime = 1 * 60 * 1000; // 1 minute

    if (timeDifference > cacheExpiryTime) {
      logger.debug(`Cached metar for ${this.icao} is expired.`);
      return true;
    } else {
      logger.debug(`Cached metar for ${this.icao} is still valid.`);
      return false;
    }
  }
}

export const MetarModel = getModelForClass(Metar);
export type MetarDocument = DocumentType<Metar>;
