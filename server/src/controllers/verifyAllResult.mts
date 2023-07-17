import { Verify } from "crypto";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mjs";
import { IVerifierResult } from "../models/VerifierResult.mjs";
import { WritableKeys } from "ts-essentials";

interface ErrorWarningCounts {
  [key: string]: number;
}

export default class VerifyAllResult implements IVerifyAllResult {
  results: IVerifierResult[];
  callsignErrorCount = 0;
  callsignWarningCount = 0;
  rawAircraftTypeErrorCount = 0;
  rawAircraftTypeWarningCount = 0;
  equipmentCodeErrorCount = 0;
  equipmentCodeWarningCount = 0;
  departureErrorCount = 0;
  departureWarningCount = 0;
  arrivalErrorCount = 0;
  arrivalWarningCount = 0;
  squawkErrorCount = 0;
  squawkWarningCount = 0;
  isHeavyErrorCount = 0;
  isHeavyWarningCount = 0;
  cruiseAltitudeErrorCount = 0;
  cruiseAltitudeWarningCount = 0;
  routeErrorCount = 0;
  routeWarningCount = 0;
  errorCount = 0;
  warningCount = 0;

  constructor() {
    this.results = [];
  }

  public get hasErrors(): boolean {
    return this.errorCount > 0;
  }

  public get hasWarnings(): boolean {
    return this.warningCount > 0;
  }

  public get hasRawAircraftTypeWarnings(): boolean {
    return this.rawAircraftTypeWarningCount > 0;
  }

  public get hasRawAircraftTypeErrors(): boolean {
    return this.rawAircraftTypeErrorCount > 0;
  }

  public get hasCallsignWarnings(): boolean {
    return this.callsignWarningCount > 0;
  }

  public get hasCallsignErrors(): boolean {
    return this.callsignErrorCount > 0;
  }

  public get hasEquipmentCodeWarnings(): boolean {
    return this.equipmentCodeWarningCount > 0;
  }

  public get hasEquipmentCodeErrors(): boolean {
    return this.equipmentCodeErrorCount > 0;
  }

  public get hasDepartureWarnings(): boolean {
    return this.departureWarningCount > 0;
  }

  public get hasDepartureErrors(): boolean {
    return this.departureErrorCount > 0;
  }

  public get hasArrivalWarnings(): boolean {
    return this.arrivalWarningCount > 0;
  }

  public get hasArrivalErrors(): boolean {
    return this.arrivalErrorCount > 0;
  }

  public get hasSquawkWarnings(): boolean {
    return this.squawkWarningCount > 0;
  }

  public get hasSquawkErrors(): boolean {
    return this.squawkErrorCount > 0;
  }

  public get hasIsHeavyWarnings(): boolean {
    return this.isHeavyWarningCount > 0;
  }

  public get hasIsHeavyErrors(): boolean {
    return this.isHeavyErrorCount > 0;
  }

  public get hasCruiseAltitudeWarnings(): boolean {
    return this.cruiseAltitudeWarningCount > 0;
  }

  public get hasCruiseAltitudeErrors(): boolean {
    return this.cruiseAltitudeErrorCount > 0;
  }

  public get hasRouteWarnings(): boolean {
    return this.routeWarningCount > 0;
  }

  public get hasRouteErrors(): boolean {
    return this.routeErrorCount > 0;
  }

  public add(result: IVerifierResult): void {
    this.results.push(result);

    const partMappings: {
      [key: string]: [
        WritableKeys<VerifyAllResult>,
        WritableKeys<VerifyAllResult>
      ];
    } = {
      callsign: ["callsignErrorCount", "callsignWarningCount"],
      rawAircraftType: [
        "rawAircraftTypeErrorCount",
        "rawAircraftTypeWarningCount",
      ],
      equipmentCode: ["equipmentCodeErrorCount", "equipmentCodeWarningCount"],
      departure: ["departureErrorCount", "departureWarningCount"],
      arrival: ["arrivalErrorCount", "arrivalWarningCount"],
      squawk: ["squawkErrorCount", "squawkWarningCount"],
      isHeavy: ["isHeavyErrorCount", "isHeavyWarningCount"],
      cruiseAltitude: [
        "cruiseAltitudeErrorCount",
        "cruiseAltitudeWarningCount",
      ],
      route: ["routeErrorCount", "routeWarningCount"],
    };

    const mappings = partMappings[result.flightPlanPart];
    if (mappings) {
      const [errorsProp, warningsProp] = mappings;

      // WritableKeys is the magic that makes this all work. Otherwise typescript throws errors
      // about attempting to use errorsProp and warningsProp as keys on this.
      if (result.status === "Error") {
        this.errorCount++;
        this[errorsProp]++;
      } else if (result.status === "Warning") {
        this.warningCount++;
        this[warningsProp]++;
      }
    }
  }
}
