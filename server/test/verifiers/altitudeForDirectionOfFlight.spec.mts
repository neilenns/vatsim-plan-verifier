import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import altitudeForDirectionOfFlight from "../../src/controllers/verifiers/altitudeForDirectionOfFlight.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Wrong altitude for direction of flight (eastbound)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5a"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Wrong altitude for direction of flight (westbound)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5b"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Wrong altitude for direction of flight (eastbound above RVSM)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5c"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 440,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Wrong altitude for direction of flight (westbound above RVSM)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5d"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 450,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Correct altitude for direction of flight (eastbound)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5e"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Correct altitude for direction of flight (westbound)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5f"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // KPDX to KSLE
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b60"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSLE",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: altitudeForDirectionOfFlight tests", function () {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans();
  });

  it("eastbound with eastbound altitude", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5e");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("altitudeValidForDirectionOfFlight");
  });

  it("westbound with westbound altitude", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5f");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("altitudeValidForDirectionOfFlight");
  });

  it("eastbound with westbound altitude", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5a");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("altitudeInvalidForEastboundDirectionOfFlight");
  });

  it("westbound with eastbound altitude", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5b");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("altitudeInvalidForWestboundDirectionOfFlight");
  });

  it("eastbound with westbound altitude above RVSM", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5c");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("altitudeInvalidForEastboundAboveRVSMDirectionOfFlight");
  });

  it("westbound with eastbound altitude above RVSM", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5d");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("altitudeInvalidForWestboundAboveRVSMDirectionOfFlight");
  });

  it("should skip KPDX to KSLE", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b60");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<VerifierResultDocument>).data;

    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("KPDXtoKSLE");
  });
});
