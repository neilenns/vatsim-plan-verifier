import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import checkForCustomAirportMessages from "../../src/controllers/verifiers/checkForCustomAirportMessages.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Airport with custom message
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b51",
    callsign: "ASA42",
    departure: "KVUO",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "PTLD2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Airport and departure with custom message
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b52",
    callsign: "ASA42",
    departure: "KVUO",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // No custom messages
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b53",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "PTLD2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
];

describe("verifier: checkForCustomAirportMessages tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should return a custom airport message", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForCustomAirportMessages(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("CustomMessage");
    expect(data[0].messageId).to.equal("customAirportMessage");
  });

  it("should return a custom airport message (even with custom departure messsage)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForCustomAirportMessages(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("CustomMessage");
    expect(data[0].messageId).to.equal("customAirportMessage");
  });

  it("should not return a custom message", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await checkForCustomAirportMessages(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult[]>).data;
    expect(data.length).to.equal(1);
    expect(data[0].status).to.equal("Information");
    expect(data[0].messageId).to.equal("noCustomMessages");
  });
});
