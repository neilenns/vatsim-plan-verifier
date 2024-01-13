import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkForGroundRestrictions from "../../src/controllers/verifiers/checkForGroundRestrictions.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // Airport and aircraft with ground restrictions via group
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "A388/L",
    route: "PTLD2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Airport has ground restrictions but aircraft doesn't
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Airport has no ground restrictions
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KEAT",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    route: "PTLD2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Airport and aircraft with ground restriction by type
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Airport and aircraft with ground restriction by wingspan
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "A388/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Airport and aircraft with ground restriction by tail height
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b56"),
    callsign: "ASA42",
    departure: "KEUG",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "A388/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
];

describe("verifier: checkForGroundRestrictions tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should have one ground restriction by group", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForGroundRestrictions(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("CustomMessage");
    expect(data[0].messageId).to.equal("groundRestriction");
  });

  it("should have one ground restriction by type", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForGroundRestrictions(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("CustomMessage");
    expect(data[0].messageId).to.equal("groundRestriction");
  });

  it("should have one ground restriction by wingspan", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForGroundRestrictions(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("CustomMessage");
    expect(data[0].messageId).to.equal("groundRestriction");
  });

  it("should have one ground restriction by tail height", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForGroundRestrictions(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("CustomMessage");
    expect(data[0].messageId).to.equal("groundRestriction");
  });

  it("should have no ground restrictions by airplane", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForGroundRestrictions(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("Information");
    expect(data[0].messageId).to.equal("noGroundRestrictions");
  });

  it("should have no ground restrictions by airport", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForGroundRestrictions(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("Information");
    expect(data[0].messageId).to.equal("noGroundRestrictions");
  });
});
