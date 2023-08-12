import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkKPDXtoKSLEAltitude from "../../src/controllers/verifiers/checkKPDXtoKSLEAltitude.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // Not to KSLE
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Not from KPDX
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KSLE",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // KPDX to KSLE below 5000 feet
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSLE",
    cruiseAltitude: 40,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // KPDX to KSLE at 5000 feet
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSLE",
    cruiseAltitude: 50,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // KPDX to KSLE above 5000 feet
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSLE",
    cruiseAltitude: 60,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
];

describe("verifier: checkKPDXtoKSLEAltitude tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("Should skip not to KSLE", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await checkKPDXtoKSLEAltitude(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("notFromKPDXtoKSLE");
  });

  it("Should skip not from KPDX", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await checkKPDXtoKSLEAltitude(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("notFromKPDXtoKSLE");
  });

  it("Should warn below 5000", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await checkKPDXtoKSLEAltitude(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("below5000");
  });

  it("Should warn at 5000", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await checkKPDXtoKSLEAltitude(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("at5000");
  });

  it("Should warn above 5000", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await checkKPDXtoKSLEAltitude(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("above5000");
  });
});
