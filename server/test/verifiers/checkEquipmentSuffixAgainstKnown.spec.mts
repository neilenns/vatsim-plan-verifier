// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkEquipmentSuffixAgainstKnown from "../../src/controllers/verifiers/checkEquipmentSuffixAgainstKnown.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import {
  addFlightPlans,
  removeFlightPlans,
} from "../setup/manageFlightPlans.mjs";

const testData = [
  // Known equipment suffix and suffix is present in flight plan.
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4b",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // B738, an aircraft not in the aircraft collection.
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4e",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // B737, no common equipment suffix in the database.
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4d",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // No equipment suffix in flight plan
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4c",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Equipment suffix doesn't match common suffix
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4f",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: checkEquipmentSuffixAgainstKnown tests", function () {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans(testData);
  });

  it("should match known equipment suffix", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Equipment suffix L matches an expected suffix for A388."
    );
  });

  it("should skip because no aircraft info available", async function () {
    // Flight plan for a B738. That aircraft isn't in the database.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4e");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Unable to verify equipment suffix as no aircraft equipment info was available."
    );
  });

  it("should skip because no known common equipment suffix", async function () {
    // Flight plan for a B737. No common equipment suffix is available for that plane.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4d");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Unable to verify equipment suffix as there is no known common suffix available for B737."
    );
  });

  it("should skip because no equipment suffix provided in flight plan", async function () {
    // Flight plan for a C172 without an equipment suffix.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Unable to verify equipment suffix as the flight plan didn't provide an equipment suffix."
    );
  });

  it("should warn because equipment suffix isn't common", async function () {
    // Flight plan for a C172 with a /L suffix.
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4f");
    expect(flightPlan.success).to.equal(true);

    const result = await checkEquipmentSuffixAgainstKnown(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.message).to.equal(
      "Equipment suffix L does not match the expected suffix for C172 (A G)."
    );
  });
});
