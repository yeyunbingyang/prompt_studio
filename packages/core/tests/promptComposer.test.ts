import { describe, expect, it } from "vitest";
import { composePrompt, normalizePrompt } from "../src/promptComposer";

describe("composePrompt", () => {
  it("drops disabled and empty fragments", () => {
    expect(
      composePrompt([
        { text: "cinematic portrait" },
        { text: "  " },
        { text: "rainy night", enabled: true },
        { text: "unused", enabled: false }
      ])
    ).toBe("cinematic portrait, rainy night");
  });
});

describe("normalizePrompt", () => {
  it("removes blank lines while keeping line structure", () => {
    expect(normalizePrompt("  subject  \n\n camera  ")).toBe("subject\ncamera");
  });
});
