import _ from "lodash";
import { type CustomLevelsLogger } from "../logger.mjs";

export function copyPropertyValue<T>(
  source: T,
  destination: T,
  property: keyof T,
  logger: CustomLevelsLogger
) {
  // Use isEqual to cover both string and array properties automatically. It's magic.
  if (!_.isEqual(source[property], destination[property])) {
    destination[property] = source[property];
  }
}
