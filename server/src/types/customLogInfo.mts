import type winston from "winston";

export interface CustomLogInfo extends winston.Logform.TransformableInfo {
  durationMs?: number;
  service?: string;
}
