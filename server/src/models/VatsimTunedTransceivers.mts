import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "vatsimTunedTransceiversModel" });

@modelOptions({ options: { customName: "tunedtransceivers" } })
export class TunedTransceivers {
  @prop({ required: true })
  callsign!: string;

  @prop()
  com1?: number;

  @prop()
  com2?: number;

  /**
   * Saves a document to the database but only if it was modified. Otherwise it does nothing.
   * @param this The document to save
   * @returns 1 if saved, 0 if not.
   */
  public async saveIfModified(this: DocumentType<TunedTransceivers>) {
    try {
      await this.save();
      return true;
    } catch (error) {
      const err = error as Error;
      logger.error(`Unable to save transceivers for ${this.callsign}: ${err.message}`);
    }

    return false;
  }
}

export const TunedTransceiversModel = getModelForClass(TunedTransceivers);
export type TunedTransceiversDocument = DocumentType<TunedTransceivers>;
