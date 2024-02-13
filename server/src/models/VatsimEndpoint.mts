import {
  DocumentType,
  ReturnModelType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";

@modelOptions({
  options: { customName: "vatsimendpoint" },
  schemaOptions: {
    toJSON: { virtuals: true, aliases: false },
    toObject: { virtuals: true, aliases: false },
  },
})
@plugin(SpeedGooseCacheAutoCleaner)
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
    return VatsimEndpointModel.findOne({ feed }).cacheQuery({ ttl: 60 * 60 });
  }
}

export const VatsimEndpointModel = getModelForClass(VatsimEndpoint);
export type VatsimEndpointDocument = DocumentType<VatsimEndpoint>;
