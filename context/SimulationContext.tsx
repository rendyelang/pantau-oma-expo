import React, { createContext, useContext, useEffect, useState } from "react";

interface SimulationData {
  bpm: number;
  activity: "Sitting" | "Walking" | "Sleeping";
  battery: number;
  isConnected: boolean;
  situation: "safe" | "danger";
  resetToSafe: () => void;
  triggerDanger: () => void;
}

const SimulationContext = createContext<SimulationData | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Omit<SimulationData, "resetToSafe" | "triggerDanger">>({
    bpm: 80,
    activity: "Sitting",
    battery: 75,
    isConnected: true,
    situation: "danger",
  });

  const resetToSafe = () => setData((prev) => ({ ...prev, situation: "safe" }));
  const triggerDanger = () => setData((prev) => ({ ...prev, situation: "danger" }));

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const bpm = Math.floor(Math.random() * (100 - 60 + 1) + 60);

        const activities: ("Sitting" | "Walking" | "Sleeping")[] = ["Sitting", "Walking", "Sleeping"];
        const activity = Math.random() > 0.8 ? activities[Math.floor(Math.random() * activities.length)] : prev.activity;

        let battery = prev.battery - 1;
        if (battery < 10) battery = 100;

        const isConnected = Math.random() > 0.05;

        // Keep existing situation
        const situation = prev.situation;

        return {
          bpm,
          activity,
          battery,
          isConnected,
          situation,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <SimulationContext.Provider value={{ ...data, resetToSafe, triggerDanger }}>{children}</SimulationContext.Provider>;
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
}
