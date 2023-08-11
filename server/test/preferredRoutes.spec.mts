import { expect } from "chai";
import { describe, it } from "mocha";
import {
  PreferredRoutesFailureTypes,
  getPreferredRoutes,
} from "../src/controllers/preferredRoutes.mjs";
import { FailureResult, SuccessResult } from "../src/types/result.mjs";
import { PreferredRouteDocument } from "../src/models/PreferredRoute.mjs";

describe("Preferred routes pre-cached data tests", () => {
  it("should return preferred routes", async () => {
    const result = await getPreferredRoutes("KPDX", "KSEA");

    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<PreferredRouteDocument[]>).data;
    expect(data).length(3);
  });

  it("should not find preferred routes", async () => {
    const result = await getPreferredRoutes("KSEA", "KPDX");

    expect(result.success).to.equal(false);

    const failure = result as FailureResult<PreferredRoutesFailureTypes>;
    expect(failure.errorType).to.equal("NoPreferredRoutesFound");
  });
});
