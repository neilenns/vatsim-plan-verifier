import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkSEAvsMONTN from "../../src/controllers/verifiers/checkSEAvsMONTN.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Not SEA8
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b51",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "PTLD2 BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // No route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b52",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    squawk: "1234",
  },
  // Always gets MONTN
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b53",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA NORMY MODDA STEVS EATZZ BZN",
    squawk: "1234",
  },
  // Gets MONTN in south flow
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b54",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 ALPSE MODDA STEVS EATZZ BZN",
    squawk: "1234",
  },
  // Gets MONTN heading eastbound
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b55",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 V2 MODDA STEVS EATZZ BZN",
    squawk: "1234",
  },
  // Gets MONTN heading northbound in south flow
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b56",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 V23 MODDA STEVS EATZZ BZN",
    squawk: "1234",
  },
  // Gets SEA
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b57",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 ARRIE MODDA STEVS EATZZ BZN",
    squawk: "1234",
  },
];

describe("verifier: checkSEAvsMONTN tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should pass not SEA", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("notOnSEA");
  });

  it("should pass no route", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noRoute");
  });

  it("should error requires MONTN", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("useMONTN");
  });

  it("should warn requires MONTN in south flow", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("southMONTN");
  });

  it("should warn requires MONTN if eastbound", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("eastboundMONTN");
  });

  it("should warn requires MONTN if northbound KSEA south flow", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("northboundMONTN");
  });

  it("should pass gets SEA", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b57");
    expect(flightPlan.success).to.equal(true);

    const result = await checkSEAvsMONTN((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("useSEA");
  });
});