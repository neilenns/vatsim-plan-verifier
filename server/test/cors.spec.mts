import { expect } from "chai";
import { describe, it } from "mocha";
import { isOriginAllowed, setWhitelist } from "../src/utils/cors.mjs";

describe("CORS wildcard validation", function () {
  it("should pass", async function () {
    let result = false;

    // Simple case
    setWhitelist("https://www.badcasserole.com");
    result = isOriginAllowed("https://www.badcasserole.com");
    expect(result).to.be.equal(true);

    // Wildcards in a list
    setWhitelist("https://www.badcasserole.com|https://*.vatsim-plan-verifier.pages.dev");
    result = isOriginAllowed("https://8e69efe7.vatsim-plan-verifier.pages.dev");
    expect(result).to.be.equal(true);

    // Issue #1027: Incorrect trailing slash
    setWhitelist("https://www.badcasserole.com/");
    result = isOriginAllowed("https://www.badcasserole.com");
    expect(result).to.be.equal(true);
  });
});
