import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

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

const NavaidModel = getModelForClass(Navaid);

export default NavaidModel;
