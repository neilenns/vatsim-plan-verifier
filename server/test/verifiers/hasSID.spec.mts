import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import hasSID from "../../src/controllers/verifiers/hasSID.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  {
    // No SID on route
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "SEA BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // Has a SID
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "SEA8 SEA BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // Has a SID with VRC's + in front
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "+SEA8 SEA BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
  // Departure airport is tagged as having no SIDs
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KPDT",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/A",
    route: "+SEA8 SEA BTG V23 OLM J42 SEA KRATR2",
    squawk: "1234",
  },
];

describe("verifier: hasSID tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans());

  it("should warn has no SID", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await hasSID((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.messageId).to.equal("noSID");
  });

  it("should have SID", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await hasSID((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("hasSID");
  });

  it("should have SID (VRC +)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await hasSID((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("hasSID");
  });

  it("should skip, departure tagged with no SIDs", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await hasSID((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("airportHasNoSIDs");
  });
});
