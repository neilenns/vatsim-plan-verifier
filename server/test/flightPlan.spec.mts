// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import {
  FlightPlanFailureErrorTypes,
  FlightPlanResult,
  getFlightPlan,
} from "../src/controllers/flightPlans.mjs";
import { IFlightPlan } from "../src/models/FlightPlan.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";
import {
  addFlightPlans,
  removeFlightPlans,
} from "./databaseSetup/manageFlightPlans.mjs";

const testData = [
  // A388 flight plan
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4b",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("Flight plan tests", async () => {
  var result: FlightPlanResult;
  before(
    "Add flight plans for tests",
    async () => await addFlightPlans(testData)
  );

  after(
    "Remove flight plans for tests",
    async () => await removeFlightPlans(testData)
  );

  describe("H/A388/L virtual property validation", async () => {
    before("Load A388 flight plan", async function () {
      result = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should have a stored flight plan", () => {
      expect(result.success).to.equal(true);
    });

    it("should be heavy", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.isHeavy).to.equal(true);
    });

    it("should have an equipment suffix", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.equipmentSuffix).to.equal("L");
    });

    it("should have departure airport information", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.departureAirportInfo).to.not.be.undefined;
    });

    it("should have arrival airport information", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.arrivalAirportInfo).to.not.be.undefined;
    });

    it("should have airline information", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.telephony).to.not.be.undefined;
    });

    it("should have route parts", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.routeParts).to.not.be.undefined;
      expect(data.routeParts?.length).to.equal(4);
    });

    it("should have formatted cruise altitude", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.cruiseAltitudeFormatted).to.equal("FL210");
    });
  });

  describe("H/A388/L computed properties validation", async () => {
    before("Load A388 flight plan", async function () {
      result = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should have a stored flight plan", () => {
      expect(result.success).to.equal(true);
    });

    it("should have the correct direction of flight", () => {
      const data = (result as SuccessResult<IFlightPlan>).data;

      expect(data.directionOfFlight).to.equal(171);
    });
  });

  describe("Non-existent flight plan validation", async () => {
    before("Load non-existent flight plan", async function () {
      result = await getFlightPlan("4f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should not have a stored flight plan", () => {
      expect(result.success).to.equal(false);
      expect(
        (result as FailureResult<FlightPlanFailureErrorTypes>).errorType
      ).to.equal("FlightPlanNotFound");
    });
  });
});
