import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import hasEquipmentSuffix from "../../src/controllers/verifiers/hasEquipmentSuffix.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  // Has equipment suffix
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4b"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "H/A388/L",
    route: "SEA1 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  // No equipment suffix in flight plan
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b4c"),
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 210,
    rawAircraftType: "C172",
    route: "SEA1 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: hasEquipmentSuffix tests", () => {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });

  after("Remove flight plans for tests", async function () {
    await removeFlightPlans();
  });

  it("is missing an equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4c");
    expect(flightPlan.success).to.equal(true);

    const result = await hasEquipmentSuffix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.ERROR);
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("missingEquipmentSuffix");
  });

  it("should have equipment suffix", async () => {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b4b");
    expect(flightPlan.success).to.equal(true);

    const result = await hasEquipmentSuffix((flightPlan as SuccessResult<FlightPlanDocument>).data);

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.INFORMATION);
    expect(data.flightPlanPart).to.equal("rawAircraftType");
    expect(data.messageId).to.equal("hasEquipmentSuffix");
  });
});
