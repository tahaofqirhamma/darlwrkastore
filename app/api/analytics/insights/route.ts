import { NextRequest, NextResponse } from "next/server";
import { fetchMiddleEastFlights } from "@/lib/opensky";
import { getEmbeddedChunks, retrieve } from "@/lib/rag";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const INSIGHTS_PROMPT = `You are an aviation analytics expert focused on the Middle East region.
You receive:
1. Live flight data (state vectors) from OpenSky Network over Middle East airspace
2. Retrieved context from a RAG knowledge base about Middle East aviation

Provide a structured analysis (2-4 paragraphs) covering:
- Traffic density and distribution (which areas are busiest)
- Notable patterns (clusters, corridors, altitude bands)
- Country/operator breakdown
- High-level predictions for the next few hours based on typical patterns
- Any anomalies or interesting observations

Be concise, data-driven, and focus on actionable insights. Format in clear paragraphs.`;

export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY not configured" },
      { status: 503 }
    );
  }

  try {
    const [flightsData, chunks] = await Promise.all([
      fetchMiddleEastFlights(),
      getEmbeddedChunks(),
    ]);

    const { flights } = flightsData;

    const summary = {
      total: flights.length,
      byCountry: {} as Record<string, number>,
      avgAltitude: 0,
      avgSpeed: 0,
    };

    let altSum = 0,
      speedSum = 0,
      altCount = 0,
      speedCount = 0;
    for (const f of flights) {
      summary.byCountry[f.origin_country] =
        (summary.byCountry[f.origin_country] ?? 0) + 1;
      if (f.baro_altitude != null) {
        altSum += f.baro_altitude;
        altCount++;
      }
      if (f.velocity != null) {
        speedSum += f.velocity;
        speedCount++;
      }
    }
    summary.avgAltitude = altCount ? Math.round(altSum / altCount) : 0;
    summary.avgSpeed = speedCount ? Math.round(speedSum / speedCount) : 0;

    const ragResults = await retrieve(
      "Middle East flight traffic patterns predictions insights",
      chunks,
      4
    );
    const ragContext = ragResults.map((r) => r.content).join("\n\n");

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });

    const dataForGpt = JSON.stringify(
      {
        time: flightsData.time,
        flightCount: flights.length,
        byCountry: summary.byCountry,
        avgAltitudeM: summary.avgAltitude,
        avgSpeedMs: summary.avgSpeed,
        sampleFlights: flights.slice(0, 15).map((f) => ({
          icao24: f.icao24,
          callsign: f.callsign,
          country: f.origin_country,
          lat: f.latitude,
          lon: f.longitude,
          alt: f.baro_altitude,
          velocity: f.velocity,
        })),
      },
      null,
      2
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: INSIGHTS_PROMPT,
        },
        {
          role: "user",
          content: `## RAG Context (Middle East aviation knowledge)\n${ragContext}\n\n## Current Live Flight Data\n${dataForGpt}\n\nAnalyze and provide insights.`,
        },
      ],
      max_tokens: 800,
    });

    const text = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      insights: text,
      summary: {
        totalFlights: flights.length,
        byCountry: summary.byCountry,
        avgAltitudeM: summary.avgAltitude,
        avgSpeedMs: summary.avgSpeed,
      },
      timestamp: flightsData.time,
    });
  } catch (e) {
    console.error("[analytics/insights]", e);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
