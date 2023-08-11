import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "apikeys" } })
class ApiKey {
  @prop()
  notes?: string;

  @prop({ default: true })
  isActive!: boolean;
}

export const ApiKeyModel = getModelForClass(ApiKey);
export type ApiKeyDocument = DocumentType<ApiKey>;
