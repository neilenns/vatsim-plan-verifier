import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import hasValidFirstFix from "../../src/controllers/verifiers/hasValidFirstFix.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  {
    // Valid SID and first fix
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "PTLD2 BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // Valid SID invalid first fix (RNAV)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "HAROB6 KOATA BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // No SID
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "SEA BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // No SID information
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "WHAMY4 BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // No first fix
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "PTLD2",
    squawk: "1234",
  },
  // Valid SID invalid first fix (non-RNAV)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b56"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "PTLD2 ARRIE BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // Departure has no initial fixes
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b57"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "EAGLE6 ARRIE BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
];
describe("verifier: hasValidFirstFix tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should have a valid first fix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("firstFixIsValid");
  });

  it("should have an invalid first fix (RNAV)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("firstFixNotInRNAVSID");
  });

  it("should have an invalid first fix (non-RNAV)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("firstFixNotInSID");
  });

  it("should skip due to no SID", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noSID");
  });

  it("should skip due to no SID information", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noSIDInformation");
  });

  it("should skip due to not enough route parts", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noFirstFix");
  });

  it("should skip due to departure not having initial fixes", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b57");
    expect(flightPlan.success).to.equal(true);

    const result = await hasValidFirstFix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noFixesOnDeparture");
  });
});
