import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import warnHeavyRunwayAssignment from "../../src/controllers/verifiers/warnHeavyRunwayAssignment.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // Is heavy, no specific runways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4b"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Is not heavy
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4c"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Is heavy, specific runways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4d"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/B748/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Is super, specific runways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4e"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: warnHeavyRunwayAssignment tests", () => {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans(testData);
  });
  it("should warn general heavy runway warning", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await warnHeavyRunwayAssignment(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("noHeavyRunways");
  });

  it("should not warn, not a heavy", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await warnHeavyRunwayAssignment(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.messageId).to.equal("notHeavyRunwayAssignment");
  });

  it("should warn heavy runway specific assignment", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4d");
    expect(flightPlan.success).to.equal(true);

    const result = await warnHeavyRunwayAssignment(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.messageId).to.equal("specificHeavyRunwayAssignment");
  });

  it("should warn super runway specific assignment", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4e");
    expect(flightPlan.success).to.equal(true);

    const result = await warnHeavyRunwayAssignment(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.messageId).to.equal("specificHeavyRunwayAssignment");
  });
});
