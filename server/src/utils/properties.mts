import _ from "lodash";

export function copyPropertyValue<T>(
  source: T,
  destination: T,
  property: keyof T,
  logger: debug.Debugger
) {
  // Use isEqual to cover both string and array properties automatically. It's magic.
  if (!_.isEqual(source[property], destination[property])) {
    logger(`Updating ${String(property)} from ${destination[property]} to ${source[property]}`);
    destination[property] = source[property];
  }
}
