// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getAirportInfo } from "../src/controllers/airportInfo.mjs";
import { getFlightAwareRoutes } from "../src/controllers/flightAwareRoutes.mjs";

import { IAirportInfo } from "../src/models/AirportInfo.mjs";
import { SuccessResult } from "../src/types/result.mjs";
import { IFlightAwareRoute } from "../src/models/FlightAwareRoute.mjs";

describe("Airport info pre-cached data tests", function () {
  it("should return KSEA data", async function () {
    const result = await getAirportInfo("KSEA");

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IAirportInfo>).data.airportCode).to.equal("KSEA");
  });

  it("should return KPDX data", async function () {
    const result = await getAirportInfo("KPDX");

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IAirportInfo>).data.airportCode).to.equal("KPDX");
  });
});
