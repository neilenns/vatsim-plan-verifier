import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import RNAVFirstFix from "../../src/controllers/verifiers/RNAVFirstFix.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // First fix is correct
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b51",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "HAROB6 HQM T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // First fix is wrong
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b52",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "HAROB6 BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // SID isn't RNAV
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b53",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "PTLD2 BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Route not long enough
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b54",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "PTLD2",
    squawk: "1234",
  },
  // Unknown SID
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b55",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "ISBRG1",
    squawk: "1234",
  },
];

describe("verifier: RNAVFirstFix tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should pass first fix is correct", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await RNAVFirstFix((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("firstFixValid");
  });

  it("should error first fix is incorrect", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await RNAVFirstFix((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("firstFixNotValid");
  });

  it("should skip SID isn't RNAV", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await RNAVFirstFix((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("notRNAV");
  });

  it("should skip route isn't long enough", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await RNAVFirstFix((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noRouteParts");
  });

  it("should skip unknown SID", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await RNAVFirstFix((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noSIDInformation");
  });
});
