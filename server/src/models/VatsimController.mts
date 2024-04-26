import {
  Ref,
  getModelForClass,
  modelOptions,
  plugin,
  pre,
  prop,
  type DocumentType,
} from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { VatsimARTCCPosition } from "./VatsimARTCCPosition.mjs";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(autopopulate)
@pre<VatsimController>("save", function (next) {
  this.positionCode = this.callsign.split("_")[0];
  next();
})
export class VatsimController {
  @prop({ required: true, index: true })
  cid!: number;

  @prop({ required: true })
  name!: string;

  @prop({ required: false, default: "", index: true, unique: true })
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

  // Reference properties
  @prop({
    ref: () => VatsimARTCCPosition,
    localField: "positionCode",
    foreignField: "positionCode",
    justOne: true,
    autopopulate: true,
  })
  artcc?: Ref<VatsimARTCCPosition>;
}

export const VatsimControllerModel = getModelForClass(VatsimController);
export type VatsimControllerDocument = DocumentType<VatsimController>;
