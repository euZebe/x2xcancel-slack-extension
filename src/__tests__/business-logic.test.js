import { describe, it, expect } from "vitest";
import { convertLinksToXCancel } from "../business-logic.js";

describe("business-logic", () => {
  it("should replace x.com single match", () => {
    expect(convertLinksToXCancel(["https://x.com/bidule"])).toStrictEqual([
      "https://xcancel.com/bidule",
    ]);
  });
  it("should replace x.com matches", () => {
    expect(
      convertLinksToXCancel(["https://x.com/bidule", "https://x.com/pouet"]),
    ).toStrictEqual([
      "https://xcancel.com/bidule",
      "https://xcancel.com/pouet",
    ]);
  });
});
