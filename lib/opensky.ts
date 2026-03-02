/**
 * OpenSky Network API - Live flight data
 * Middle East bounding box: Gulf, Levant, Turkey, Egypt, Iran
 * https://openskynetwork.github.io/opensky-api/rest.html
 */

const OPENSKY_BASE = "https://opensky-network.org/api";

export const MIDDLE_EAST_BBOX = {
  lamin: 12,
  lamax: 42,
  lomin: 25,
  lomax: 75,
} as const;

export type FlightState = {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  velocity: number | null;
  on_ground: boolean;
  vertical_rate: number | null;
  true_track: number | null;
};

function parseStateVector(row: unknown[]): FlightState {
  return {
    icao24: String(row[0] ?? ""),
    callsign: row[1] ? String(row[1]).trim() || null : null,
    origin_country: String(row[2] ?? ""),
    longitude: typeof row[5] === "number" ? row[5] : null,
    latitude: typeof row[6] === "number" ? row[6] : null,
    baro_altitude: typeof row[7] === "number" ? row[7] : null,
    velocity: typeof row[9] === "number" ? row[9] : null,
    on_ground: Boolean(row[8]),
    vertical_rate: typeof row[11] === "number" ? row[11] : null,
    true_track: typeof row[10] === "number" ? row[10] : null,
  };
}

export async function fetchMiddleEastFlights(): Promise<{
  time: number;
  flights: FlightState[];
}> {
  const params = new URLSearchParams({
    lamin: String(MIDDLE_EAST_BBOX.lamin),
    lamax: String(MIDDLE_EAST_BBOX.lamax),
    lomin: String(MIDDLE_EAST_BBOX.lomin),
    lomax: String(MIDDLE_EAST_BBOX.lomax),
  });
  const res = await fetch(`${OPENSKY_BASE}/states/all?${params}`, {
    next: { revalidate: 10 },
    headers: { "User-Agent": "DarLwrkaAnalytics/1.0" },
  });
  if (!res.ok) {
    throw new Error(`OpenSky API error: ${res.status}`);
  }
  const data = (await res.json()) as { time?: number; states?: unknown[][] };
  const states = data.states ?? [];
  const flights = states.map(parseStateVector).filter((f) => !f.on_ground);
  return {
    time: data.time ?? Math.floor(Date.now() / 1000),
    flights,
  };
}
