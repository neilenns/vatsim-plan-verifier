import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkForPreferredRoutes from "../../src/controllers/verifiers/checkForPreferredRoutes.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // No preferred route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b50",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
  },
  // No equipment info
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b51",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B731/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
  },
  // Correct preferred route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b52",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 200,
    rawAircraftType: "B737/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
  },
  // Wrong speed for preferred route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b53",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 200,
    rawAircraftType: "C172/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
  },
  // Wrong altitude for preferred route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b54",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 60,
    rawAircraftType: "B737/L",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    squawk: "1234",
  },
];

describe("verifier: checkForPreferredRoutes tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should not have aircraft info", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForPreferredRoutes((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noAircraftInfoForPreferredRoute");
  });

  it("should not find a preferred route", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b50");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForPreferredRoutes((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noPreferredRoute");
  });

  it("should find a preferred route", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForPreferredRoutes((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Ok");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("preferredRoute");
  });

  it("should not match a preferred route due to min speed", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForPreferredRoutes((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("notPreferredRoute");
  });

  it("should not match a preferred route due to min altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForPreferredRoutes((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("notPreferredRoute");
  });
});
