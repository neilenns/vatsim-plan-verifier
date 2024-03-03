import type IVerifyAllResult from "../interfaces/IVerifyAllResult.mjs";
import { type VerifierResultDocument, VerifierResultStatus } from "../models/VerifierResult.mjs";
import { type WritableKeys } from "ts-essentials";

// This magic ensures type safety when adding a result to the class,
// when incrementing the appropriate error/warning count.
type WritableVerifyAllResultKeys = WritableKeys<VerifyAllResult>;

export default class VerifyAllResult implements IVerifyAllResult {
  results: VerifierResultDocument[];
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
  cruiseAltitudeErrorCount = 0;
  cruiseAltitudeWarningCount = 0;
  routeErrorCount = 0;
  routeWarningCount = 0;
  errorCount = 0;
  warningCount = 0;

  constructor(init?: Partial<IVerifyAllResult>) {
    this.results = [];

    Object.assign(this, init);
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

  public addMany(results: VerifierResultDocument[]): void {
    for (const result of results) {
      this.add(result);
    }
  }

  public add(result: VerifierResultDocument): void {
    this.results.push(result);

    // Absolute typescript magic. Create the property names for the error and warning
    // count properties based on the flight plan part that was verified. The
    // WritableKeys type is used to let TypeScript know these should be ok. Then for
    // runtime checking the "in this" test is done to make sure the property actually
    // exists. Insanity. I can't believe this works.
    const errorProp: WritableVerifyAllResultKeys = `${result.flightPlanPart}ErrorCount`;
    const warningProp: WritableVerifyAllResultKeys = `${result.flightPlanPart}WarningCount`;

    if (result.status === VerifierResultStatus.ERROR) {
      if (errorProp in this) {
        this.errorCount++;
        this[errorProp]++;
      }
    }

    if (result.status === "Warning") {
      if (warningProp in this) {
        this.warningCount++;
        this[warningProp]++;
      }
    }
  }

  public toJSON(): VerifyAllResult {
    return {
      ...this,
      hasRawAircraftTypeWarnings: this.hasRawAircraftTypeWarnings,
      hasRawAircraftTypeErrors: this.hasRawAircraftTypeErrors,
      hasCallsignWarnings: this.hasCallsignWarnings,
      hasCallsignErrors: this.hasCallsignErrors,
      hasEquipmentCodeWarnings: this.hasEquipmentCodeWarnings,
      hasEquipmentCodeErrors: this.hasEquipmentCodeErrors,
      hasDepartureWarnings: this.hasDepartureWarnings,
      hasDepartureErrors: this.hasDepartureErrors,
      hasArrivalWarnings: this.hasArrivalWarnings,
      hasArrivalErrors: this.hasArrivalErrors,
      hasSquawkWarnings: this.hasSquawkWarnings,
      hasSquawkErrors: this.hasSquawkErrors,
      hasCruiseAltitudeWarnings: this.hasCruiseAltitudeWarnings,
      hasCruiseAltitudeErrors: this.hasCruiseAltitudeErrors,
      hasRouteWarnings: this.hasRouteWarnings,
      hasRouteErrors: this.hasRouteErrors,
    };
  }
}
