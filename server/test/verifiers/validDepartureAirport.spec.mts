import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import validDepartureAirport from "../../src/controllers/verifiers/validDepartureAirport.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Departure airport information is available
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b51",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Departure airport information is not available
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b52",
    callsign: "ASA42",
    departure: "KEAT",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: validDepartureAirport tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should be a valid departure airport", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await validDepartureAirport((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("departure");
    expect(data.messageId).to.equal("validDepartureAirport");
  });

  it("should not be a valid departure airport", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await validDepartureAirport((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("departure");
    expect(data.messageId).to.equal("noDepartureAirportInfo");
  });
});
