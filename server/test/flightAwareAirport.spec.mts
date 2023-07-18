// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightAwareAirport } from "../src/controllers/flightAwareAirports.mjs";
import { IFlightAwareAirport } from "../src/models/FlightAwareAirport.mjs";
import { SuccessResult } from "../src/types/result.mjs";

describe("FlightAware airport tests", () => {
  it("should return KSEA data", async () => {
    const result = await getFlightAwareAirport("KSEA");

    expect(result.success).to.equal(true);
    expect(
      (result as SuccessResult<IFlightAwareAirport>).data.airportCode
    ).to.equal("KSEA");
  });

  it("should return KPDX data", async () => {
    const result = await getFlightAwareAirport("KPDX");

    expect(result.success).to.equal(true);
    expect(
      (result as SuccessResult<IFlightAwareAirport>).data.airportCode
    ).to.equal("KPDX");
  });
});
