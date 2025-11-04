import { cn } from "@/lib/utils";

describe("utils.cn", () => {
  it("cn: merges & filters (one test covers both behaviors)", () => {
    const out1 = cn("px-2", "text-sm", "text-lg");
    const out2 = cn(null as any, undefined as any, "", 0 as any, "block");
    expect(out1).toBe("px-2 text-lg");
    expect(out2).toBe("block");
  });
});
