import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import airwaysForEquipmentSuffix from "../../src/controllers/verifiers/airwaysForEquipmentSuffix.mjs";
import { FlightPlan, FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // RNAV and GNSS capable with RNAV (Q) airway
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // No RNAV with RNAV (Q) airway
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // No RNAV, NO GNSS, with no RNAV (Q) or GPS (T) airways
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
  // No GNSS with GPS (T) airways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "SEA BTG T23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // RNAV, no GNSS, with GPS (T) airways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/Z",
    route: "SEA BTG T23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // No route parts
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b56"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    squawk: "1234",
  },
];

describe("verifier: airwaysForEquipmentSuffix tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should pass RNAV and GNSS capable with RNAV (Q) airway", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await airwaysForEquipmentSuffix(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("isRNAVandGNSSCapable");
  });

  it("should warn no RNAV with RNAV (Q) airway", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await airwaysForEquipmentSuffix(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonRNAVonRNAVAirways");
  });

  it("should pass no RNAV, no GNSS, with no RNAV (Q) or GPS (T) airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await airwaysForEquipmentSuffix(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("planeCanFlyAirways");
  });

  it("should warn no RNAV, no GNSS, with GPS (T) airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await airwaysForEquipmentSuffix(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonGNSSonGNSSAirways");
  });

  it("should warn RNAV, no GNSS, with GPS (T) airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await airwaysForEquipmentSuffix(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonGNSSonGNSSAirways");
  });

  it("should pass no route specified", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await airwaysForEquipmentSuffix(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noRouteParts");
  });
});
