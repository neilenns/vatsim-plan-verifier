// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { joinWithWord } from "../src/utils/formatting.mjs";

describe("Formatting tests", () => {
  it("should join three items", async function () {
    const result = joinWithWord(["1", "2", "3"], "or");

    expect(result).to.equal("1, 2 or 3");
  });

  it("should join two items", async function () {
    const result = joinWithWord(["1", "2"], "or");

    expect(result).to.equal("1 or 2");
  });

  it("should join one item", async function () {
    const result = joinWithWord(["1"], "or");

    expect(result).to.equal("1");
  });

  it("should join no items", async function () {
    const result = joinWithWord([], "or");

    expect(result).to.equal("");
  });
});
