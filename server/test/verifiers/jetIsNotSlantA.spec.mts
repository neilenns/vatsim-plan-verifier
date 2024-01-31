import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import jetIsNotSlantA from "../../src/controllers/verifiers/jetIsNotSlantA.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Jet with /A
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5b"),
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
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5c"),
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
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5d"),
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
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5e"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "TBM9/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: jetIsNotSlantA tests", function () {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans();
  });

  it("should warn because jet with /A is not ok", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5b");
    expect(flightPlan.success).to.equal(true);

    const result = await jetIsNotSlantA((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.messageId).to.equal("jetIsSlantA");
  });

  it("should skip because jet with /L is ok", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5c");
    expect(flightPlan.success).to.equal(true);

    const result = await jetIsNotSlantA((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("jetIsNotSlantA");
  });

  it("should skip because it's a turboprop", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5e");
    expect(flightPlan.success).to.equal(true);

    const result = await jetIsNotSlantA((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("unableToVerifJetIsNotSlantAEngineTypeNotJ");
  });

  it("should skip because it's a piston", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5d");
    expect(flightPlan.success).to.equal(true);

    const result = await jetIsNotSlantA((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("unableToVerifJetIsNotSlantAEngineTypeNotJ");
  });
});
