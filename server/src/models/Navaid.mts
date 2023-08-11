import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";

@modelOptions({ options: { customName: "navaid" } })
export class Navaid {
  @prop({ required: true })
  class!: string;

  @prop({ required: true })
  ident!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  type!: number;
}

export const NavaidModel = getModelForClass(Navaid);
export type NavaidDocument = DocumentType<Navaid>;
