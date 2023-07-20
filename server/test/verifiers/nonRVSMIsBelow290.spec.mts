import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import nonRVSMIsBelow290 from "../../src/controllers/verifiers/nonRVSMIsBelow290.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // /L at 290
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b51",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 290,
    rawAircraftType: "B737/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // /L above 290
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b52",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 310,
    rawAircraftType: "B737/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // /L below 290
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b53",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B737/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // /A at 290
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b54",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 290,
    rawAircraftType: "B737/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // /A above 290
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b55",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 310,
    rawAircraftType: "B737/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // /A below 290
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b56",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 270,
    rawAircraftType: "B737/A",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // No equipment suffix
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b57",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 290,
    rawAircraftType: "B737",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: nonRVSMIsBelow290 tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should pass because plane is RVSM capable at FL290", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("RVSMCapable");
  });

  it("should pass because plane is RVSM capable above FL290", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("RVSMCapable");
  });

  it("should pass because plane is RVSM capable below FL290", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("RVSMCapable");
  });

  it("should error because plane is not RVSM capable at FL290", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("nonRVSMAtOrAbove290");
  });

  it("should error because plane is not RVSM capable above FL290", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b55");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Error");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("nonRVSMAtOrAbove290");
  });

  it("should pass because plane is not RVSM capable but is below FL290", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b56");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("nonRVSMBelow290");
  });

  it("should pass because plane has no equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b57");
    expect(flightPlan.success).to.equal(true);

    const result = await nonRVSMIsBelow290((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("noEquipmentSuffix");
  });
});
