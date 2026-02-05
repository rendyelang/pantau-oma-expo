import { useEffect, useState } from "react";

export interface DummyData {
  bpm: number;
  activity: "Sitting" | "Walking" | "Sleeping";
  battery: number;
  isConnected: boolean;
  situation: "safe" | "danger";
}

export function useDummyData() {
  const [data, setData] = useState<DummyData>({
    bpm: 80,
    activity: "Sitting",
    battery: 75,
    isConnected: true,
    situation: "safe",
  });

  const resetToSafe = () => setData((prev) => ({ ...prev, situation: "safe" }));

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const bpm = Math.floor(Math.random() * (100 - 60 + 1) + 60);

        const activities: DummyData["activity"][] = ["Sitting", "Walking", "Sleeping"];
        const activity = Math.random() > 0.8 ? activities[Math.floor(Math.random() * activities.length)] : prev.activity;

        let battery = prev.battery - 1;
        if (battery < 10) battery = 100;

        const isConnected = Math.random() > 0.05;

        // Keep existing situation, don't change randomly
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

  return { ...data, resetToSafe };
}
