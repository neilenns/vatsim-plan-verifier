import { DocumentType, getModelForClass, modelOptions, plugin, prop } from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

@modelOptions({ options: { customName: "navaid" } })
@plugin(SpeedGooseCacheAutoCleaner)
class Navaid {
  @prop({ required: true })
  class!: string;

  @prop({ required: true })
  ident!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  type!: number;

  @prop({ required: true })
  latitude!: number;

  @prop({ requried: true })
  longitude!: number;
}

export const NavaidModel = getModelForClass(Navaid);
export type NavaidDocument = DocumentType<Navaid>;
