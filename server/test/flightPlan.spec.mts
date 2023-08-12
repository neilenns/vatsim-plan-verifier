// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import {
  FlightPlanFailureErrorTypes,
  FlightPlanResult,
  getFlightPlan,
} from "../src/controllers/flightPlans.mjs";
import { FlightPlanDocument } from "../src/models/FlightPlan.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "./setup/manageFlightPlans.mjs";
import { Types } from "mongoose";
import { isDocument } from "@typegoose/typegoose";

const testData = [
  // A388 flight plan
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
  // No SID
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b51"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Has a SID that is a known departure
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b52"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Has a SID that is not a known departure
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b53"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "CASCD2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
  // Has a + in front of the route
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b54"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "B738/L",
    route: "+CASCD2 SEA BTG T23 OLM Q42 SEA KRATR2",
    squawk: "1234",
  },
];

describe("Flight plan tests", function () {
  let result: FlightPlanResult;

  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans(testData);
  });

  describe("Property cleanup", function () {
    it("should not have a + on the route after save", async function () {
      const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b54");
      expect(flightPlan.success).to.equal(true);

      const data = (flightPlan as SuccessResult<FlightPlanDocument>).data;
      expect(data.route).to.not.satisfy((route: string) => route?.startsWith("+"));
    });
  });

  describe("SID virtual property validation", function () {
    it("should not have a SID or SID Information", async function () {
      const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b51");
      expect(flightPlan.success).to.equal(true);

      const data = (flightPlan as SuccessResult<FlightPlanDocument>).data;
      expect(data.SID).to.equal(undefined);
      expect(data.SIDInformation).to.equal(null);
    });

    it("should have a SID and SID information", async function () {
      const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b52");
      expect(flightPlan.success).to.equal(true);

      const data = (flightPlan as SuccessResult<FlightPlanDocument>).data;
      expect(data.SID).to.equal("SEA8");
      expect(data.SIDInformation).to.not.equal(null);
      expect(isDocument(data.SIDInformation) ? data.SIDInformation?.SID : "").to.equal("SEA8");
    });

    it("should have a SID but no SID information", async function () {
      const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b53");
      expect(flightPlan.success).to.equal(true);

      const data = (flightPlan as SuccessResult<FlightPlanDocument>).data;
      expect(data.SID).to.equal("CASCD2");
      expect(data.SIDInformation).to.equal(null);
    });
  });

  describe("H/A388/L virtual property validation", function () {
    before("Load A388 flight plan", async function () {
      result = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should have a stored flight plan", function () {
      expect(result.success).to.equal(true);
    });

    it("should be heavy", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.isHeavy).to.equal(true);
    });

    it("should have an equipment suffix", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.equipmentSuffix).to.equal("L");
    });

    it("should have departure airport information", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.departureAirportInfo).to.not.be.undefined;
    });

    it("should have arrival airport information", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.arrivalAirportInfo).to.not.be.undefined;
    });

    it("should have airline information", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.telephony).to.not.be.undefined;
    });

    it("should have route parts", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.routeParts).to.not.be.undefined;
      expect(data.routeParts?.length).to.equal(4);
    });

    it("should have formatted cruise altitude", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.cruiseAltitudeFormatted).to.equal("FL210");
    });
  });

  describe("H/A388/L computed properties validation", async function () {
    before("Load A388 flight plan", async function () {
      result = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should have a stored flight plan", function () {
      expect(result.success).to.equal(true);
    });

    it("should have the correct direction of flight", function () {
      const data = (result as SuccessResult<FlightPlanDocument>).data;

      expect(data.directionOfFlight).to.equal(171);
    });
  });

  describe("Non-existent flight plan validation", async function () {
    before("Load non-existent flight plan", async function () {
      result = await getFlightPlan("4f9f7b3b9d3b3c1b1c9b4b4b");
    });

    it("should not have a stored flight plan", function () {
      expect(result.success).to.equal(false);
      expect((result as FailureResult<FlightPlanFailureErrorTypes>).errorType).to.equal(
        "FlightPlanNotFound"
      );
    });
  });
});
