import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import warnHeavyRunwayAssignment from "../../src/controllers/verifiers/warnHeavyRunwayAssignment.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import {
  addFlightPlans,
  removeFlightPlans,
} from "../databaseSetup/manageFlightPlans.mjs";

const testData = [
  // Is heavy
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4b",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Is not heavy
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4c",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

before(
  "Add flight plans for tests",
  async () => await addFlightPlans(testData)
);

after(
  "Remove flight plans for tests",
  async () => await removeFlightPlans(testData)
);

describe("verifier: warnHeavyRunwayAssignment tests", () => {
  it("should have heavy runway assignment warning", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await warnHeavyRunwayAssignment(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IVerifierResult>).data.status).to.equal(
      "Warning"
    );
  });

  it("should not have heavy runway assignment warning", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await warnHeavyRunwayAssignment(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IVerifierResult>).data.status).to.equal(
      "Information"
    );
  });
});
