import { DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

@modelOptions({ options: { customName: "apikeys" } })
@plugin(SpeedGooseCacheAutoCleaner)
class ApiKey {
  @prop()
  notes?: string;

  @prop({ default: true })
  isActive!: boolean;
}

export const ApiKeyModel = getModelForClass(ApiKey);
export type ApiKeyDocument = DocumentType<ApiKey>;
