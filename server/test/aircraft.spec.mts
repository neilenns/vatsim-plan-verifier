// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getAircraft } from "../src/controllers/aircraft.mjs";
import { IAircraft } from "../src/models/Aircraft.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";

describe("Aircraft tests", () => {
  it("should return C172 data", async function () {
    const result = await getAircraft("5f9f7b9b9b3b3c1b3c1b3c1c");

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IAircraft>).data.equipmentCode).to.equal(
      "C172"
    );
  });

  it("should return B737 data", async function () {
    const result = await getAircraft("5f9f7b9b9b3b3c1b3c1b3c1b");

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IAircraft>).data.equipmentCode).to.equal(
      "B737"
    );
  });

  it("should return A388 data", async function () {
    const result = await getAircraft("5f9f7b9b9b3b3c1b3c1b3c1d");

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<IAircraft>).data.equipmentCode).to.equal(
      "A388"
    );
  });

  it("should return AircraftNotFound for invalid aircraft", async function () {
    const result = await getAircraft("4f9f7b9b9b3b3c1b3c1b3c1d");

    expect(result.success).to.equal(false);
    expect((result as FailureResult<"AircraftNotFound">).errorType).to.equal(
      "AircraftNotFound"
    );
  });
});
