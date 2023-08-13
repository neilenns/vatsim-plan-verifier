import { expect } from "chai";
import { describe, it } from "mocha";
import { SuccessResult } from "@customTypes/result.mjs";
import { PilotStatsDocument } from "@models/PilotStats.mjs";
import { getVatsimPilotStats } from "../src/controllers/vatsim.mjs";

describe("Pilot stats tests", () => {
  it("should return pilot stats", async function () {
    const result = await getVatsimPilotStats(1525628);

    expect(result.success).to.equal(true);
    expect((result as SuccessResult<PilotStatsDocument>).data.cid).to.equal(1525628);
  });
});
