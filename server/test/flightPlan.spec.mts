// tests/calculator.spec.tx
import { assert } from "chai";
import { describe, it } from "mocha";
import {
  FlightPlanFailureErrorTypes,
  FlightPlanResult,
  getFlightPlan,
} from "../src/controllers/flightPlans.mjs";
import { IFlightPlan } from "../src/models/FlightPlan.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";

describe("Flight plan tests", async () => {
  var result: FlightPlanResult;

  describe("H/A388/L rawAircraftType validation", async () => {
    before("Load A388 flight plan", async function () {
      result = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should have a stored flight plan", () => {
      assert.equal(result.success, true);
    });

    it("should be heavy", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      assert.equal(data.isHeavy, true);
    });

    it("should have an equipment suffix", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      assert.equal(data.equipmentSuffix, "L");
    });
  });

  describe("H/A388/L computed properties validation", async () => {
    before("Load A388 flight plan", async function () {
      result = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should have a stored flight plan", () => {
      assert.equal(result.success, true);
    });

    it("should have the correct direction of flight", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      assert.equal(data.directionOfFlight, 171);
    });
  });

  describe("Non-existent flight plan validation", async () => {
    before("Load non-existent flight plan", async function () {
      result = await getFlightPlan("4f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should not have a stored flight plan", () => {
      assert.equal(result.success, false);
      assert.equal(
        (result as FailureResult<FlightPlanFailureErrorTypes>).errorType,
        "FlightPlanNotFound"
      );
    });
  });
});
