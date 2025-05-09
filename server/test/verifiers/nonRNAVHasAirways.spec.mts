import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import nonRNAVHasAirways from "../../src/controllers/verifiers/nonRNAVHasAirways.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // RNAV with no airways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 290,
    rawAircraftType: "B737/L",
    route: "SEA9 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Non-RNAV with airways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 100,
    rawAircraftType: "C172/A",
    route: "PTLD2 BTG V23 SEA",
    squawk: "1234",
  },
  // Non-RNAV with no airways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 100,
    rawAircraftType: "C172/A",
    route: "PTLD2 BTG AST",
    squawk: "1234",
  },
  // Non-RNAV with RNAV airways
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 100,
    rawAircraftType: "C172/A",
    route: "PTLD2 BTG Q3 AST",
    squawk: "1234",
  },
  // No equipment suffix
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b55"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 100,
    rawAircraftType: "C172",
    route: "PTLD2 BTG Q3 AST",
    squawk: "1234",
  },
  // Non-RNAV with no airways but one fix starts with J (issue #312)
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b56"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 100,
    rawAircraftType: "C172/A",
    route: "SUMMA2 SUMMA JINMO LMT TUDOR2",
    squawk: "1234",
  },
];

describe("verifier: nonRNAVHasAirways tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans());

  it("should pass RNAV plane with no airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRNAVHasAirways((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("RNAVCapable");
  });

  it("should pass non-RNAV plane with airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRNAVHasAirways((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonRNAVHasAirways");
  });

  it("should error non-RNAV plane with no airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRNAVHasAirways((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonRNAVNoAirways");
  });

  it("should error non-RNAV plane with RNAV airways", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRNAVHasAirways((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonRNAVNoAirways");
  });

  it("should skip no equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRNAVHasAirways((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noEquipmentSuffix");
  });

  it("should error non-RNAV plane with no airways (fix starts with J)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRNAVHasAirways((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("nonRNAVNoAirways");
  });
});
