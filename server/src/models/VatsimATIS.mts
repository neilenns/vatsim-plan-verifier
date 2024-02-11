import { DocumentType, getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "vatsimATISModel" });

@modelOptions({
  options: { customName: "vatsimatis" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@pre<VatsimATIS>("save", function (this: DocumentType<VatsimATIS>) {
  if (this.isModified()) {
    this.revision++;
  }
})
class VatsimATIS {
  @prop({ required: false, default: 0 })
  revision!: number;

  @prop({ required: false, default: "", index: true, unique: true })
  callsign!: string;

  @prop({ required: false, default: "" })
  frequency!: string;

  @prop({ required: false, default: "" })
  code!: string;

  @prop({ required: false, type: () => [String], default: [] })
  rawText!: string[];

  // Virtual properties
  public get text(): string {
    return this.rawText?.join(" ") ?? "";
  }

  public get Airport(): string {
    return this.callsign.split("_")?.[0] ?? "";
  }

  /**
   * Saves a document to the database but only if it was modified. Otherwise it does nothing.
   * @param this The document to save
   * @returns 1 if saved, 0 if not.
   */
  public async saveIfModified(this: DocumentType<VatsimATIS>) {
    if (this.isModified()) {
      try {
        await this.save();
        return true;
      } catch (error) {
        const err = error as Error;
        logger.error(`Unable to save ATIS ${this.callsign}: ${err.message}`);
      }
    }

    return false;
  }
}

export const VatsimATISModel = getModelForClass(VatsimATIS);
export type VatsimATISDocument = DocumentType<VatsimATIS>;
