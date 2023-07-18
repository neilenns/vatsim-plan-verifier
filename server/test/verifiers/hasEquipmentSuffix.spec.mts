// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import hasEquipmentSuffix from "../../src/controllers/verifiers/hasEquipmentSuffix.mjs";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";

describe("verifier: hasEquipmentSuffix tests", () => {
  it("should have equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await hasEquipmentSuffix(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IVerifierResult>).data.status).to.equal(
      "Information"
    );
  });

  it("should not have an equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await hasEquipmentSuffix(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IVerifierResult>).data.status).to.equal(
      "Error"
    );
  });
});
