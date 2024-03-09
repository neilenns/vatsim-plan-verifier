import { type DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

@modelOptions({
  options: { customName: "pilotstats" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(autopopulate)
@plugin(SpeedGooseCacheAutoCleaner)
export class PilotStats {
  @prop({ required: true, index: true, unique: true })
  cid!: number;

  @prop({ required: true, default: 0 })
  atc!: number;

  @prop({ required: true, default: 0 })
  pilot!: number;

  @prop({ required: true, default: 0 })
  s1!: number;

  @prop({ required: true, default: 0 })
  s2!: number;

  @prop({ required: true, default: 0 })
  s3!: number;

  @prop({ required: true, default: 0 })
  c1!: number;

  @prop({ required: true, default: 0 })
  c2!: number;

  @prop({ required: true, default: 0 })
  c3!: number;

  @prop({ required: true, default: 0 })
  i1!: number;

  @prop({ required: true, default: 0 })
  i2!: number;

  @prop({ required: true, default: 0 })
  i3!: number;

  @prop({ required: true, default: 0 })
  sup!: number;

  @prop({ required: true, default: 0 })
  adm!: number;

  // Cache the results for 1 day
  @prop({ required: true, expires: "1d", default: Date.now })
  createdAt!: Date;

  // private convertHoursToDaysHoursMinutes(hours: number) {
  //   const totalMinutes = Math.round(hours * 60);
  //   const days = Math.floor(totalMinutes / (60 * 24));
  //   const hoursLeft = Math.floor((totalMinutes - days * 60 * 24) / 60);
  //   const minutesLeft = totalMinutes - days * 60 * 24 - hoursLeft * 60;
  //   return { days, hours: hoursLeft, minutes: minutesLeft };
  // }
}

// Define the model
export const PilotStatsModel = getModelForClass(PilotStats);
export type PilotStatsDocument = DocumentType<PilotStats>;
