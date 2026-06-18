import { NextResponse } from "next/server";

export function notImplemented(feature: string, plannedFor = "Phase 2") {
  return NextResponse.json(
    {
      ok: false,
      code: "NOT_IMPLEMENTED",
      feature,
      plannedFor,
      message: `${feature} is scaffolded but not implemented in the MVP.`,
    },
    { status: 501 },
  );
}
