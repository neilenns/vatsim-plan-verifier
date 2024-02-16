import { DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "vatsimTunedTransceiversModel" });

@modelOptions({ options: { customName: "tunedtransceivers" } })
@plugin(SpeedGooseCacheAutoCleaner)
export class TunedTransceivers {
  @prop({ required: true })
  callsign!: string;

  @prop()
  com1?: number;

  @prop()
  com2?: number;
}

export const TunedTransceiversModel = getModelForClass(TunedTransceivers);
export type TunedTransceiversDocument = DocumentType<TunedTransceivers>;
