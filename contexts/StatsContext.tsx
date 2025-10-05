"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type StatsContextType = {
  refreshStats: () => void;
  statsVersion: number;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [statsVersion, setStatsVersion] = useState(0);

  const refreshStats = () => {
    setStatsVersion((prev) => prev + 1);
  };

  return (
    <StatsContext.Provider value={{ refreshStats, statsVersion }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
}
