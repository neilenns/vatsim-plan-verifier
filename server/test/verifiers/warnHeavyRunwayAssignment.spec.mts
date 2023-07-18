// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import warnHeavyRunwayAssignment from "../../src/controllers/verifiers/warnHeavyRunwayAssignment.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";

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
