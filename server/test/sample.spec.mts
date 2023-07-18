// tests/calculator.spec.tx
import { assert } from "chai";
import { describe, it } from "mocha";
import hasEquipmentSuffix from "../src/controllers/verifiers/hasEquipmentSuffix.mjs";
import FlightPlan from "../src/models/FlightPlan.mjs";

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", () => {
    const foo = hasEquipmentSuffix(new FlightPlan({}));
    const result = 2 + 3;
    assert.equal(result, 5);
  });
});
