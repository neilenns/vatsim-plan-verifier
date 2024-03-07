import { expect } from "chai";
import { describe, it } from "mocha";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import { calculateInitialSID } from "../../src/controllers/verifiers/checkSEAInitialSID.mjs";
import { FlightPlanDocument } from "../../src/models/FlightPlan.mjs";
import { AirportFlow } from "../../src/models/InitialAltitude.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import _testData from "../setup/kseaPlans.json" with { type: "json" };
import { ITestDataEntry, addTestData, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

class TestData implements ITestDataEntry {
  _id?: string;
  expectedSID?: string; // Some tests will return undefined for the expected SID meaning just use the one that was on the original plan
  flow: AirportFlow = AirportFlow.Unknown;
  rawFlightPlan: string = "";
}

// Necessary so Typescript doesn't complain about flow being a string instead of AirportFlow
const testData = _testData as TestData[];

describe("verifier: checkSEAInitialSID tests", () => {
  before("Add flight plans for tests", async () => await addTestData(testData));

  after("Remove flight plans for tests", async () => await removeFlightPlans());

  it("check SEA initial SIDs", async () => {
    let verifiedPlans = 0;
    // Loop through all the test data and check each one to see if
    // the correct initial SID is returned.
    for (const test of testData) {
        const flightPlan = await getFlightPlan(test._id ?? "");
        expect(flightPlan.success).to.equal(true);

        const plan = (flightPlan as SuccessResult<FlightPlanDocument>).data;
        const data = await calculateInitialSID(plan)
        expect(data?.SID).to.equal(
          test.expectedSID,
          `${test.rawFlightPlan} (${test.flow.toLowerCase()} flow)`
        );
        verifiedPlans++;
      }

    console.log(`Verified ${verifiedPlans} flight plans for the KSEA initial SID.`);
  });
});
