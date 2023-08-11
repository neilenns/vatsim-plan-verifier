// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightAwareRoutes } from "../src/controllers/flightAwareRoutes.mjs";

import { SuccessResult } from "../src/types/result.mjs";
import { FlightAwareRouteDocument } from "../src/models/FlightAwareRoute.mjs";

describe("FlightAware pre-cached data tests", function () {
  it("should return KSEA-KPDX routes", async function () {
    const result = await getFlightAwareRoutes({
      departure: "KSEA",
      arrival: "KPDX",
    });

    expect(result.success).to.equal(true);

    const routes = (result as SuccessResult<FlightAwareRouteDocument[]>).data;
    expect(routes.length).to.equal(6);
  });
});
