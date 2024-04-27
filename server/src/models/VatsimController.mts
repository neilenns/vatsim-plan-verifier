import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  type DocumentType,
} from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { VatsimARTCCPositionModel } from "./VatsimARTCCPosition.mjs";

// Setter for the callsign property. Returns the value passed in as the value for the
// callsign, but also sets the positionCode property.
function setPositionCode(this: VatsimControllerDocument, value: string): string {
  this.positionCode = value.split("_")[0];
  return value;
}

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(autopopulate)
export class VatsimController {
  @prop({ required: true, index: true })
  cid!: number;

  @prop({ required: true })
  name!: string;

  @prop({
    required: false,
    default: "",
    index: true,
    unique: true,
    // Per the Typegoose documentation, both get and set must always be specified even if you don't need a getter
    set: setPositionCode,
    get: (value: string) => value,
  })
  callsign!: string;

  @prop({ required: true })
  frequency!: string;

  @prop({ required: true })
  facility!: number;

  @prop({ required: true })
  rating!: number;

  @prop({ required: false, type: () => [String], default: [] })
  rawText!: string[];

  @prop({ required: true })
  logonTime!: Date;

  @prop({ required: false, default: "" })
  positionCode?: string;

  @prop({ required: false })
  artccName?: string;

  public async setArtcc(this: VatsimControllerDocument): Promise<void> {
    const artcc = await VatsimARTCCPositionModel.findOne({ positionCode: this.positionCode });

    if (artcc !== null && artcc !== undefined) {
      this.artccName = artcc.name;
    }
  }
}

export const VatsimControllerModel = getModelForClass(VatsimController);
export type VatsimControllerDocument = DocumentType<VatsimController>;
