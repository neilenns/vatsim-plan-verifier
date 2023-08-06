import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import routeWithFlightAware from "../../src/controllers/verifiers/routeWithFlightAware.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Departure/arrival available from Flight Aware, matches a route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5a",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Departure/arrival available from Flight Aware, does not match a route
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5b",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA KRATR2",
    squawk: "1234",
  },
  // Departure/arrival not available from Flight Aware
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5c",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KEAT",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Departure/arrival available from Flight Aware, matches a route, wrong altitude
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5d",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 10,
    rawAircraftType: "B738/L",
    route: "SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Departure/arrival available from Flight Aware, matches a route with SID
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5e",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Departure/arrival available from Flight Aware, matches a route with SID, has step climb
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5f",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO/N0450F390 KRATR2",
    squawk: "1234",
  },
];

describe("verifier: routeWithFlightAware tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should find no routes", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5c");
    expect(flightPlan.success).to.equal(true);

    const result = await routeWithFlightAware((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Information");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("noFlightAwareRoutes");
  });

  it("should find matching routes with correct altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5a");
    expect(flightPlan.success).to.equal(true);

    const result = await routeWithFlightAware((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Ok");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("matchesFlightAwareRouteAndAltitudes");
  });

  it("should find matching routes with incorrect altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5d");
    expect(flightPlan.success).to.equal(true);

    const result = await routeWithFlightAware((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("matchesFlightAwareRouteNotAltitudes");
  });

  it("should find routes but doesn't match them", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5b");
    expect(flightPlan.success).to.equal(true);

    const result = await routeWithFlightAware((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;
    expect(data.status).to.equal("Warning");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("doesNotMatchFlightAwareRoutes");
  });

  it("should find matching routes with correct altitude (with SID)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5e");
    expect(flightPlan.success).to.equal(true);

    const result = await routeWithFlightAware((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Ok");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("matchesFlightAwareRouteAndAltitudes");
  });

  it("should find matching routes with correct altitude (with stepclimb)", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5f");
    expect(flightPlan.success).to.equal(true);

    const result = await routeWithFlightAware((flightPlan as SuccessResult<IFlightPlan>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Ok");
    expect(data.flightPlanPart).to.equal("route");
    expect(data.messageId).to.equal("matchesFlightAwareRouteAndAltitudes");
  });
});
