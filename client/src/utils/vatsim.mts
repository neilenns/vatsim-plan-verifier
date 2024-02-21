import { ImportState } from "../interfaces/IVatsimFlightPlan.mjs";

export function getColorByStatus(
  status: ImportState | undefined,
  isCoasting: boolean | undefined
): string {
  if (isCoasting) {
    return "grey.600";
  }

  switch (status) {
    case ImportState.NEW:
      return "success.main";
    case ImportState.UPDATED:
      return "error.main";
    default:
      return "text.primary";
  }
}
