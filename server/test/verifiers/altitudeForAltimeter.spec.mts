import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import altitudeForAltimeter from "../../src/controllers/verifiers/altitudeForAltimeter.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";
import { Types } from "mongoose";

const testData = [
  // Should pass, altimeter is high enough
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 180,
    rawAircraftType: "B738/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Should pass, altimeter 28.91 and cruise altitude 17,000
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 170,
    rawAircraftType: "B738/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Should error, altimeter 29.91 and cruise altitude FL180
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KGEG",
    arrival: "KSEA",
    cruiseAltitude: 180,
    rawAircraftType: "B738/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Should error, altimeter 28.91 and cruise altitude FL190
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KPDX",
    arrival: "KSEA",
    cruiseAltitude: 190,
    rawAircraftType: "B738/L",
    route: "SUMMA2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
];

describe("verifier: altitudeForAltimeter tests", () => {
  before("Add flight plans for tests", async () => await addFlightPlans(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans(testData));

  it("should pass FL180 with altimeter 29.95", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForAltimeter(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("AltimeterIsHighEnough");
  });

  it("should pass 17,000' with altimeter 28.91", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForAltimeter(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("AltitudeIsLowEnough");
  });

  it("should error FL180 with altimeter 29.91", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForAltimeter(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("FL180Unavailable");
  });

  it("should error FL190 with altimeter 28.91", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
    expect(flightPlan.success).to.equal(true);

    const result = await altitudeForAltimeter(
      (flightPlan as SuccessResult<FlightPlanDocument>).data
    );

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("cruiseAltitude");
    expect(data.messageId).to.equal("FL190Unavailable");
  });
});
