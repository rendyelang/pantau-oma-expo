import { useEffect, useState } from "react";

export interface DummyData {
  bpm: number;
  activity: "Sitting" | "Walking" | "Sleeping";
  battery: number;
  isConnected: boolean;
}

export function useDummyData() {
  const [data, setData] = useState<DummyData>({
    bpm: 80,
    activity: "Sitting",
    battery: 75,
    isConnected: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        // Randomize BPM (60 - 100)
        const bpm = Math.floor(Math.random() * (100 - 60 + 1) + 60);

        // Randomize Activity
        const activities: DummyData["activity"][] = ["Sitting", "Walking", "Sleeping"];
        // 20% chance to change activity to prevent too frequent jumps
        const activity = Math.random() > 0.8 ? activities[Math.floor(Math.random() * activities.length)] : prev.activity;

        // Drain battery slowly, recharge if low (simulation logic)
        let battery = prev.battery - 1;
        if (battery < 10) battery = 100; // Auto recharge simulation

        // Random connection drop (low chance)
        const isConnected = Math.random() > 0.05;

        return {
          bpm,
          activity,
          battery,
          isConnected,
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return data;
}
