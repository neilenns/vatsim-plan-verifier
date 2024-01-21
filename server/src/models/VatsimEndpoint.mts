import {
  DocumentType,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  options: { customName: "vatsimendpoint" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
class VatsimEndpoint {
  @prop({ required: true })
  feed!: string;

  @prop({ required: true })
  href!: string;

  /**
   * Looks up an endpoint in the database
   * @param this The VatsimEndpointModel
   * @param feed The name of the feed to look up
   * @returns The VatsimEndpoint for the feed
   */
  public static async findEndpoint(this: ReturnModelType<typeof VatsimEndpoint>, feed: string) {
    return VatsimEndpointModel.findOne({ feed });
  }
}

export const VatsimEndpointModel = getModelForClass(VatsimEndpoint);
export type VatsimEndpointDocument = DocumentType<VatsimEndpoint>;
