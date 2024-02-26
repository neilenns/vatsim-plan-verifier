import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "navaids" } })
class Navaid {
  @prop({ required: true })
  class!: string;

  @prop({ required: true, index: true })
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
