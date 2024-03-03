import { type DocumentType, getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";

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
}

export const VatsimATISModel = getModelForClass(VatsimATIS);
export type VatsimATISDocument = DocumentType<VatsimATIS>;
