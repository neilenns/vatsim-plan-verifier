import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "apikeys" } })
export class ApiKey {
  @prop()
  notes?: string;

  @prop({ default: true })
  isActive!: boolean;
}

export const ApiKeyModel = getModelForClass(ApiKey);
