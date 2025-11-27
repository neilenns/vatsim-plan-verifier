// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getDeparture } from "../src/controllers/departure.mjs";
import { Departure } from "../src/models/Departure.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";

describe("Departure tests", () => {
  it("should return SEA1", async function () {
    const result = await getDeparture("5f9f7b9b9b3b3c1b3c1b3c13");

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<Departure>).data.SID).to.equal("SEA1");
  });

  it("should return DepartureNotFound for unknown departure", async function () {
    const result = await getDeparture("5f9f7b9b9b3b3c1b3c1b3c03");

    expect(result.success).to.equal(false);
    expect((result as FailureResult<"DepartureNotFound">).errorType).to.equal("DepartureNotFound");
  });
});
