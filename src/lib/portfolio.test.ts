import { describe, expect, it } from "vitest";
import { makeEmailDraft, projects } from "./portfolio";
describe("portfolio rules", () => {
  it("features the first supplied project", () => {
    expect(projects[0]?.github).toBe("https://github.com/hritik4160-oss/100DaysLeetCodeChallange");
  });
  it("addresses contact enquiries to the supplied email", () => {
    const draft = makeEmailDraft("Visitor", "visitor@example.com", "Hello Hritik");
    expect(draft.split("?")[0]).toBe("mailto:hritik4160@gmail.com");
    expect(decodeURIComponent(draft)).toContain("Reply to: visitor@example.com");
  });
});
