import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import pistonNotSlantLorZ from "../../src/controllers/verifiers/pistonNotSlantLorZ.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // Piston with not /L or /Z
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172/G",
    squawk: "1234",
  },
  // Piston with /L
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172/L",
    squawk: "1234",
  },
  // Piston with /Z
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172/Z",
    squawk: "1234",
  },
  // Non-piston with /L
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    squawk: "1234",
  },
  // No equipment info available
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    squawk: "1234",
  },

  // No equipment suffix
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b56"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738",
    squawk: "1234",
  },
];

describe("verifier: pistonNotSlantLorZ tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should pass piston isn't /L or /Z", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await pistonNotSlantLorZ((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("engineTypeAndEquipmentSuffixLikelyFine");
  });

  it("should warn piston is /L", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await pistonNotSlantLorZ((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("pistonWithSlantLorZ");
  });

  it("should warn piston is /Z", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await pistonNotSlantLorZ((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("pistonWithSlantLorZ");
  });

  it("should pass jet is /L", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await pistonNotSlantLorZ((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("engineTypeAndEquipmentSuffixLikelyFine");
  });

  it("should pass no equipment info", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await pistonNotSlantLorZ((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("noEngineType");
  });

  it("should pass no equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await pistonNotSlantLorZ((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("noEquipmentSuffix");
  });
});
