import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkForEventReroutes from "../../src/controllers/verifiers/checkForEventReroutes.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { AirportFlow } from "../../src/models/InitialAltitude.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // No event reroute, departure airport doesn't match
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b50"),
    callsign: "ASA42",
    departure: "KSLE",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
    flow: AirportFlow.South,
  },
  // No event reroute, flow not specified
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B731/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
  },
  // No event reroute, flow doesn't match
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 200,
    rawAircraftType: "B737/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
    flow: AirportFlow.North,
  },
  // No event reroute, fixes don't overlap
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 200,
    rawAircraftType: "C172/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
    flow: AirportFlow.South,
  },
  // Has a reroute
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 60,
    rawAircraftType: "B737/L",
    route: "SUMMA2 SUMMA JINMO Q7 JAGWA BURGL IRNMN2",
    squawk: "1234",
    flow: AirportFlow.South,
  },
  // Has a departure frequency
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 60,
    rawAircraftType: "B737/L",
    route: "PTLD2 COUGA KRIEG HAWKZ8",
    squawk: "1234",
    flow: AirportFlow.East,
  },
];

describe("verifier: checkForEventReroutes tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans());

  it("shouldn't have a reroute, departure airport doesn't match", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b50");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForEventReroutes(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noEventReroutes");
  });

  it("shouldn't have a reroute, flow not specified", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForEventReroutes(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("unknownAirportFlow");
  });

  it("shouldn't have a reroute, flow doesn't match", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForEventReroutes(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noEventReroutes");
  });

  it("shouldn't have a reroute, no overlapping fixes", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForEventReroutes(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noMatchingEventReroutes");
  });

  it("should have a reroute", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForEventReroutes(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("notRequiredEventRoute");
  });

  it("should have a departure frequency", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForEventReroutes(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("notRequiredEventRoute");
  });
});
