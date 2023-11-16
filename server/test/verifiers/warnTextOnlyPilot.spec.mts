import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import warnTextOnlyPilot from "../../src/controllers/verifiers/warnTextOnlyPilot.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import {
  VerifierResult,
  VerifierResultDocument,
  VerifierResultStatus,
} from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // Is explicitly voice
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4a"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
    remarks: "TCAS SIMBRIEF, SHARED COCKPIT /V/",
  },
  // Is explicitly receive
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4b"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
    remarks: "TCAS SIMBRIEF, SHARED COCKPIT /R/",
  },
  // Is explicitly text
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4c"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
    remarks: "TCAS SIMBRIEF, SHARED COCKPIT /T/",
  },
  // Is voice by default
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4d"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
    remarks: "TCAS SIMBRIEF, SHARED COCKPIT",
  },
];

describe("verifier: warnTextOnlyPilot tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should info voice pilot", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4a");
    expect(flightPlan.success).to.equal(true);

    const result = await warnTextOnlyPilot((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("callsign");
    expect(data.messageId).to.equal("voicePilot");
  });

  it("should info receive pilot", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await warnTextOnlyPilot((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("callsign");
    expect(data.messageId).to.equal("receivePilot");
  });

  it("should warn text only pilot", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await warnTextOnlyPilot((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("callsign");
    expect(data.messageId).to.equal("textOnlyPilot");
  });

  it("should info voice pilot (implicit)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4d");
    expect(flightPlan.success).to.equal(true);

    const result = await warnTextOnlyPilot((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.flightPlanPart).to.equal("callsign");
    expect(data.messageId).to.equal("voicePilot");
  });
});
