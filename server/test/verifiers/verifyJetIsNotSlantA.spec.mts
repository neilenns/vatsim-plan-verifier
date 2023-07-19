import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import verifyJetIsNotSlantA from "../../src/controllers/verifiers/verifyJetIsNotSlantA.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import {
  addFlightPlans,
  removeFlightPlans,
} from "../setup/manageFlightPlans.mjs";

const testData = [
  // Jet with /A
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5b",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B737/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Jet with /L
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5c",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Piston with /A
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5d",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "C172/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Turboprop with /A
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5e",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "TBM9/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: verifyJetIsNotSlantA tests", function () {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans(testData);
  });

  it("should warn because jet with /A is not ok", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5b");
    expect(flightPlan.success).to.equal(true);

    const result = await verifyJetIsNotSlantA(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal("Warning");
    expect(data.messageId).to.equal("jetIsSlantA");
  });

  it("should skip because jet with /L is ok", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5c");
    expect(flightPlan.success).to.equal(true);

    const result = await verifyJetIsNotSlantA(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal("Information");
    expect(data.messageId).to.equal("jetIsNotSlantA");
  });

  it("should skip because it's a turboprop", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5e");
    expect(flightPlan.success).to.equal(true);

    const result = await verifyJetIsNotSlantA(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal("Information");
    expect(data.messageId).to.equal(
      "unableToVerifyJetIsNotSlantAEngineTypeNotJ"
    );
  });

  it("should skip because it's a piston", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5d");
    expect(flightPlan.success).to.equal(true);

    const result = await verifyJetIsNotSlantA(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal("Information");
    expect(data.messageId).to.equal(
      "unableToVerifyJetIsNotSlantAEngineTypeNotJ"
    );
  });
});
