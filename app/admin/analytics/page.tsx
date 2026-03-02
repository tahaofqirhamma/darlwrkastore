"use client";

import { useEffect, useState } from "react";
import { StoreHeader } from "@/components/store-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Sparkles,
  RefreshCw,
  BarChart3,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/login/actions";

type FlightState = {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  velocity: number | null;
};

type FlightsData = { time: number; flights: FlightState[] };

type InsightsData = {
  insights: string;
  summary: {
    totalFlights: number;
    byCountry: Record<string, number>;
    avgAltitudeM: number;
    avgSpeedMs: number;
  };
  timestamp: number;
};

export default function AnalyticsPage() {
  const [flights, setFlights] = useState<FlightsData | null>(null);
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    setLoadingFlights(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics/flights");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as FlightsData;
      setFlights(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoadingFlights(false);
    }
  };

  const fetchInsights = async () => {
    setLoadingInsights(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics/insights", { method: "POST" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as InsightsData;
      setInsights(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const byCountry = flights
    ? Object.entries(
        flights.flights.reduce<Record<string, number>>((acc, f) => {
          acc[f.origin_country] = (acc[f.origin_country] ?? 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <div className="flex flex-row justify-between items-center w-full px-4 py-4">
        <div className="flex gap-2">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              Commandes
            </Button>
          </Link>
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline">
            Logout
          </Button>
        </form>
      </div>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">
            Analytics v2 — Middle East Skylines
          </h1>
          <p className="text-muted-foreground">
            Live flight data from OpenSky Network + GPT insights with RAG
          </p>
        </div>

        {error && (
          <Card className="bg-destructive/10 border-destructive">
            <CardContent className="py-4 text-destructive">{error}</CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live flights */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Plane className="h-5 w-5" />
                Live Flights (Middle East)
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchFlights}
                disabled={loadingFlights}
              >
                {loadingFlights ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {loadingFlights ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : flights ? (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {flights.flights.length} en vol
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Mise à jour il y a{" "}
                      {Math.round((Date.now() / 1000 - flights.time) / 60)} min
                    </span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto rounded border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 sticky top-0">
                        <tr>
                          <th className="text-left p-2">Callsign</th>
                          <th className="text-left p-2">Pays</th>
                          <th className="text-right p-2">Alt (m)</th>
                          <th className="text-right p-2">Vitesse</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flights.flights.slice(0, 50).map((f, i) => (
                          <tr key={`${f.icao24}-${i}`} className="border-t">
                            <td className="p-2 font-mono">
                              {f.callsign ?? f.icao24}
                            </td>
                            <td className="p-2">{f.origin_country}</td>
                            <td className="p-2 text-right">
                              {f.baro_altitude != null
                                ? Math.round(f.baro_altitude)
                                : "-"}
                            </td>
                            <td className="p-2 text-right">
                              {f.velocity != null
                                ? `${Math.round(f.velocity * 1.944)} kt`
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Country breakdown */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <BarChart3 className="h-5 w-5" />
                Répartition par pays
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingFlights ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-2 max-h-[320px] overflow-y-auto">
                  {byCountry.slice(0, 15).map(([country, count]) => (
                    <div
                      key={country}
                      className="flex justify-between items-center py-1 border-b border-border last:border-0"
                    >
                      <span className="text-foreground">{country}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* GPT Insights */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Sparkles className="h-5 w-5" />
              Analyses & prédictions (GPT + RAG)
            </CardTitle>
            <Button
              onClick={fetchInsights}
              disabled={loadingInsights || loadingFlights}
            >
              {loadingInsights ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Génération...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Générer des insights
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {insights ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>
                    {insights.summary.totalFlights} vols analysés
                  </Badge>
                  <Badge variant="secondary">
                    Alt moyenne: {insights.summary.avgAltitudeM} m
                  </Badge>
                  <Badge variant="secondary">
                    Vitesse moy: {insights.summary.avgSpeedMs} m/s
                  </Badge>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {insights.insights}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground py-8 text-center">
                Cliquez sur &quot;Générer des insights&quot; pour une analyse
                GPT basée sur les vols en direct et le contexte RAG Middle East.
                <br />
                <span className="text-xs">
                  Requiert OPENAI_API_KEY dans .env
                </span>
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
