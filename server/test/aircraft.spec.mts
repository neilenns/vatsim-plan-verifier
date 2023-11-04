import { expect } from "chai";
import { describe, it } from "mocha";
import { getAircraftById, getAircraftByName } from "../src/controllers/aircraft.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";
import { AircraftDocument } from "../src/models/Aircraft.mjs";

describe("Aircraft tests", () => {
  it("should return C172 data", async function () {
    const result = await getAircraftById("5f9f7b9b9b3b3c1b3c1b3c1c");

    expect(result.success).to.equal(true);

    const aircraft = result as SuccessResult<AircraftDocument>;
    expect(aircraft.data.equipmentCode).to.equal("C172");
    expect(aircraft.data.isHeavy).to.equal(false);
    expect(aircraft.data.isSuper).to.equal(false);
  });

  it("should return B737 data", async function () {
    const result = await getAircraftById("5f9f7b9b9b3b3c1b3c1b3c1b");

    expect(result.success).to.equal(true);

    const aircraft = result as SuccessResult<AircraftDocument>;
    expect(aircraft.data.equipmentCode).to.equal("B737");
    expect(aircraft.data.isHeavy).to.equal(false);
    expect(aircraft.data.isSuper).to.equal(false);
  });

  it("should return A388 data", async function () {
    const result = await getAircraftById("5f9f7b9b9b3b3c1b3c1b3c1d");

    expect(result.success).to.equal(true);

    const aircraft = result as SuccessResult<AircraftDocument>;
    expect(aircraft.data.equipmentCode).to.equal("A388");
    expect(aircraft.data.isSuper).to.equal(true);
  });

  it("should return B748 data", async function () {
    const result = await getAircraftById("5f9f7b9b9b3b3c1b3c1b3c1f");

    expect(result.success).to.equal(true);

    const aircraft = result as SuccessResult<AircraftDocument>;
    expect(aircraft.data.equipmentCode).to.equal("B748");
    expect(aircraft.data.isHeavy).to.equal(true);
    expect(aircraft.data.isSuper).to.equal(false);
  });

  it("should return AircraftNotFound for invalid aircraft", async function () {
    const result = await getAircraftById("4f9f7b9b9b3b3c1b3c1b3c1d");

    expect(result.success).to.equal(false);
    expect((result as FailureResult<"AircraftNotFound">).errorType).to.equal("AircraftNotFound");
  });

  it("should return C172 data by name", async function () {
    const result = await getAircraftByName("172");

    expect(result.success).to.equal(true);

    const aircraft = (result as SuccessResult<AircraftDocument[]>).data;

    expect(aircraft);

    expect(aircraft).to.be.a("array");
    expect(aircraft.length).to.equal(1);
    expect(aircraft[0].equipmentCode).to.equal("C172");
  });

  it("should return AircraftNotFound for no matching name", async function () {
    const result = await getAircraftByName("150");

    expect(result.success).to.equal(false);
    expect((result as FailureResult<"AircraftNotFound">).errorType).to.equal("AircraftNotFound");
  });
});
