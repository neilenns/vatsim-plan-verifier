import { expect } from "chai";
import { describe, it } from "mocha";
import altitudeForDirectionOfFlight from "../../src/controllers/verifiers/altitudeForDirectionOfFlight.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import { IFlightPlan } from "../../src/models/FlightPlan.mjs";
import { IVerifierResult } from "../../src/models/VerifierResult.mjs";
import {
  addFlightPlans,
  removeFlightPlans,
} from "../databaseSetup/manageFlightPlans.mjs";

const testData = [
  // Wrong altitude for direction of flight (eastbound)
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5a",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Wrong altitude for direction of flight (westbound)
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5b",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Wrong altitude for direction of flight (eastbound above RVSM)
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5c",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 440,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Wrong altitude for direction of flight (westbound above RVSM)
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5d",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 450,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // Correct altitude for direction of flight (eastbound)
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
  // Correct altitude for direction of flight (westbound)
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b5f",
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: altitudeForDirectionOfFlight tests", () => {
  before(
    "Add flight plans for tests",
    async () => await addFlightPlans(testData)
  );

  after(
    "Remove flight plans for tests",
    async () => await removeFlightPlans(testData)
  );

  it("eastbound with eastbound altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5e");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Cruise altitude FL210 is valid for the direction of flight (171)."
    );
  });

  it("westbound with westbound altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5f");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Information");
    expect(data.message).to.equal(
      "Cruise altitude FL200 is valid for the direction of flight (351)."
    );
  });

  it("eastbound with westbound altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5a");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Error");
    expect(data.message).to.equal(
      "Direction of flight is eastbound (171) but FL200 is even. Offer FL190 or FL210."
    );
  });

  it("westbound with eastbound altitude", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5b");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Error");
    expect(data.message).to.equal(
      "Direction of flight is westbound (351) but FL210 is odd. Offer FL200 or FL220."
    );
  });

  it("eastbound with westbound altitude above RVSM", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5c");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Error");
    expect(data.message).to.equal(
      "Direction of flight is eastbound (171) but FL440 is not one of the eastbound RVSM altitudes. Offer FL450, FL490, FL530, FL570."
    );
  });

  it("westbound with eastbound altitude above RVSM", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5d");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForDirectionOfFlight(
      (flightPlan as SuccessResult<IFlightPlan>).data
    );

    expect(result.success).to.equal(true);
    const data = (result as SuccessResult<IVerifierResult>).data;

    expect(data.status).to.equal("Error");
    expect(data.message).to.equal(
      "Direction of flight is westbound (351) but FL450 is not one of the westbound RVSM altitudes. Offer FL430, FL470, FL510, FL550, FL590."
    );
  });
});
