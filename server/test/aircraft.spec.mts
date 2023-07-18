// tests/calculator.spec.tx
import { assert } from "chai";
import { describe, it } from "mocha";
import { getAircraft } from "../src/controllers/aircraft.mjs";

describe("FlightAware airport tests", () => {
  it("should return C172 data", async () => {
    const result = await getAircraft("5f9f7b9b9b3b3c1b3c1b3c1c");

    if (result.success) {
      assert.equal(result.success, true);
      assert.equal(result.data.equipmentCode, "C172");
    } else {
      assert.fail("result should have been returned by the database");
    }
  });

  it("should return B737 data", async () => {
    const result = await getAircraft("5f9f7b9b9b3b3c1b3c1b3c1b");

    if (result.success) {
      assert.equal(result.success, true);
      assert.equal(result.data.equipmentCode, "B737");
    } else {
      assert.fail("result should have been returned by the database");
    }
  });

  it("should return A388 data", async () => {
    const result = await getAircraft("5f9f7b9b9b3b3c1b3c1b3c1d");

    if (result.success) {
      assert.equal(result.success, true);
      assert.equal(result.data.equipmentCode, "A388");
    } else {
      assert.fail("result should have been returned by the database");
    }
  });

  it("should return AircraftNotFound for invalid aircraft", async () => {
    const result = await getAircraft("4f9f7b9b9b3b3c1b3c1b3c1d");

    if (result.success) {
      assert.fail("result should not have been returned by the database");
    } else {
      assert.equal(result.success, false);
      assert.equal(result.errorType, "AircraftNotFound");
    }
  });
});
