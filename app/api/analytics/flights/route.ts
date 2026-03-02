import { NextResponse } from "next/server";
import { fetchMiddleEastFlights } from "@/lib/opensky";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await fetchMiddleEastFlights();
    return NextResponse.json(data);
  } catch (e) {
    console.error("[analytics/flights]", e);
    return NextResponse.json(
      { error: "Failed to fetch flight data" },
      { status: 500 }
    );
  }
}
