import {
  DocumentType,
  ReturnModelType,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "magneticDeclination" });

@modelOptions({ options: { customName: "magneticdeclination" } })
class MagneticDeclination extends defaultClasses.TimeStamps {
  @prop({ required: true })
  icao!: string;

  @prop({ required: true, index: true, unique: true })
  magneticDeclination!: number;

  public static async findByICAO(
    this: ReturnModelType<typeof MagneticDeclination>,
    icao: string
  ): Promise<MagneticDeclinationDocument | null> {
    return await this.findOne({ icao });
  }

  public async isExpired(this: DocumentType<MagneticDeclination>): Promise<boolean> {
    if (!(this.updatedAt instanceof Date)) return false;

    const currentTime = Date.now();
    const timeDifference = currentTime - this.updatedAt.getTime();
    const cacheExpiryTime = ENV.MAGNETIC_DECLINATION_CACHE_EXPIRY;

    if (timeDifference > cacheExpiryTime) {
      logger.debug(`Cached magnetic declination for ${this.icao} is expired.`);
      return true;
    } else {
      logger.debug(`Cached magnetic decliniation for ${this.icao} is still valid.`);
      return false;
    }
  }
}

export const MagneticDeclinationModel = getModelForClass(MagneticDeclination);
export type MagneticDeclinationDocument = DocumentType<MagneticDeclination>;
