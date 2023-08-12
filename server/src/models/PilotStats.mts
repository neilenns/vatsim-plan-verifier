import { prop, getModelForClass, modelOptions, DocumentType, plugin } from "@typegoose/typegoose";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate)
@modelOptions({
  options: { customName: "pilotstats" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
export class PilotStats {
  @prop({ required: true, index: true, unique: true })
  pilotId!: number;

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

  // public get atcTime() {
  //   return this.convertHoursToDaysHoursMinutes(this.atc);
  // }

  // public get s1Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.s1);
  // }

  // public get s2Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.s2);
  // }

  // public get s3Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.s3);
  // }

  // public get c1Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.c1);
  // }

  // public get c2Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.c2);
  // }

  // public get c3Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.c3);
  // }

  // public get i1Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.i1);
  // }

  // public get i2Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.i2);
  // }

  // public get i3Time() {
  //   return this.convertHoursToDaysHoursMinutes(this.i3);
  // }

  // public get supTime() {
  //   return this.convertHoursToDaysHoursMinutes(this.sup);
  // }

  // public get admTime() {
  //   return this.convertHoursToDaysHoursMinutes(this.adm);
  // }

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
