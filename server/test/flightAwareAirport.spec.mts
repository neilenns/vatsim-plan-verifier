// tests/calculator.spec.tx
import { assert } from "chai";
import { describe, it } from "mocha";
import { getFlightAwareAirport } from "../src/controllers/flightAwareAirports.mjs";

describe("FlightAware airport tests", () => {
  it("should return KSEA data", async () => {
    const airport = await getFlightAwareAirport("KSEA");

    if (airport.success) {
      assert.equal(airport.success, true);
      assert.equal(airport.data.airportCode, "KSEA");
    } else {
      assert.fail("Airport should have been returned by the mock");
    }
  });

  it("should return KPDX data", async () => {
    const airport = await getFlightAwareAirport("KPDX");

    if (airport.success) {
      assert.equal(airport.success, true);
      assert.equal(airport.data.airportCode, "KPDX");
    } else {
      assert.fail("Airport should have been returned by the mock");
    }
  });
});
