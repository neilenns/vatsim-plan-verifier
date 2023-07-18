// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkEquipmentSuffixAgainstKnown from "../../src/controllers/verifiers/checkEquipmentSuffixAgainstKnown.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";

describe("verifier: checkEquipmentSuffixAgainstKnown tests", () => {
  it("should match known equipment suffix", async () => {
    // Flight plan with a plane that has a known equipment suffix and the suffix
    // is present in the flight plan.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Equipment suffix L matches an expected suffix for A388."
    );
  });

  it("should skip because no aircraft info available", async () => {
    // Flight plan for a B738. That aircraft isn't in the database.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4e");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Unable to verify equipment suffix as no aircraft equipment info was available."
    );
  });

  it("should skip because no known common equipment suffix", async () => {
    // Flight plan for a B737. No common equipment suffix is available for that plane.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4d");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Unable to verify equipment suffix as there is no known common suffix available for B737."
    );
  });

  it("should skip because no equipment suffix provided in flight plan", async () => {
    // Flight plan for a C172 without an equipment suffix.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Unable to verify equipment suffix as the flight plan didn't provide an equipment suffix."
    );
  });

  it("should warn because equipment suffix isn't common", async () => {
    // Flight plan for a C172 with a /L suffix.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4f");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.message).to.equal(
      "Equipment suffix L does not match the expected suffix for C172 (A G)."
    );
  });

  it("should pass because equipment suffix matches common suffix", async () => {
    // Flight plan for an A388 with a /L suffix.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Equipment suffix L matches an expected suffix for A388."
    );
  });
});
