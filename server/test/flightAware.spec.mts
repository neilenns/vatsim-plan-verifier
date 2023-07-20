// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightAwareAirport } from "../src/controllers/flightAwareAirports.mjs";
import { getFlightAwareRoutes } from "../src/controllers/flightAwareRoutes.mjs";

import { IFlightAwareAirport } from "../src/models/FlightAwareAirport.mjs";
import { SuccessResult } from "../src/types/result.mjs";
import { IFlightAwareRoute } from "../src/models/FlightAwareRoute.mjs";

describe("FlightAware pre-cached data tests", function () {
  it("should return KSEA data", async function () {
    const result = await getFlightAwareAirport("KSEA");

    expect(result.success).to.equal(true);
    expect(
      (result as SuccessResult<IFlightAwareAirport>).data.airportCode
    ).to.equal("KSEA");
  });

  it("should return KPDX data", async function () {
    const result = await getFlightAwareAirport("KPDX");

    expect(result.success).to.equal(true);
    expect(
      (result as SuccessResult<IFlightAwareAirport>).data.airportCode
    ).to.equal("KPDX");
  });

  it("should return KSEA-KPDX routes", async function () {
    const result = await getFlightAwareRoutes({
      departure: "KSEA",
      arrival: "KPDX",
    });

    expect(result.success).to.equal(true);

    const routes = (result as SuccessResult<IFlightAwareRoute[]>).data;
    expect(routes.length).to.equal(6);
  });
});
