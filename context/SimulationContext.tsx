import { useAuth } from "@/context/AuthContext";
import { logHistoryEvent } from "@/services/database";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

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

// Configure notifications to show even when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Omit<SimulationData, "resetToSafe" | "triggerDanger">>({
    bpm: 80,
    activity: "Sitting",
    battery: 75,
    isConnected: true,
    situation: "safe", // Default safe logic
  });

  const { user } = useAuth();

  // Refs to track previous states to avoid spamming usage of State in Effect would be circular or laggy without refs for "previous" comparison if we just used dependencies.
  // Actually, we can use a ref to store the *previous* value to compare against.
  const prevDataRef = useRef(data);

  const resetToSafe = () => {
    setData((prev) => ({ ...prev, situation: "safe" }));
    if (user && data.situation === "danger") {
      logHistoryEvent(user.uid, {
        type: "SAFE",
        title: "Situation Resolved",
        description: "User marked situation as safe.",
      });
    }
  };

  const triggerDanger = () => {
    setData((prev) => ({ ...prev, situation: "danger" }));
    // Log is handled in effect to check for state transition, or we can do it here.
    // Doing it in effect guarantees we catch all danger transitions if we had other triggers.
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Monitor state changes for notifications
  useEffect(() => {
    const prev = prevDataRef.current;

    const checkNotifications = async () => {
      // Guard: Only notify if user is logged in
      if (!user) return;

      // 1. Danger Situation
      if (data.situation === "danger" && prev.situation !== "danger") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        await schedulePushNotification("DANGER ALERT!", "Oma is in a dangerous situation. Please check immediately!");
        logHistoryEvent(user.uid, {
          type: "DANGER",
          title: "Danger Detected",
          description: "System detected a dangerous situation.",
        });
      }

      // 2. Connection Lost
      if (!data.isConnected && prev.isConnected) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        await schedulePushNotification("Connection Lost", "Lost connection to Oma's device.");
        logHistoryEvent(user.uid, {
          type: "CONNECTION",
          title: "Connection Lost",
          description: "Device disconnected from network.",
        });
      }

      // 3. Low Battery (Only trigger once when crossing the threshold)
      if (data.battery <= 20 && prev.battery > 20) {
        await schedulePushNotification("Low Battery", `Device battery is critical (${data.battery}%). Please charge.`);
        logHistoryEvent(user.uid, {
          type: "BATTERY",
          title: "Low Battery",
          description: `Battery level dropped to ${data.battery}%.`,
        });
      }
    };

    checkNotifications();
    prevDataRef.current = data;
  }, [data, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        // Only random logic if we are NOT in danger manually triggered?
        // Or let danger persist until reset?
        // The previous code kept the existing situation effectively if it wasn't random.
        // Let's keep the user's manual trigger if set.

        const bpm = Math.floor(Math.random() * (100 - 60 + 1) + 60);

        const activities: ("Sitting" | "Walking" | "Sleeping")[] = ["Sitting", "Walking", "Sleeping"];
        // 80% chance to keep same activity
        const activity = Math.random() > 0.8 ? activities[Math.floor(Math.random() * activities.length)] : prev.activity;

        let battery = prev.battery - 1;
        if (battery < 10) battery = 100; // Reset for simulation purposes

        // 5% chance to disconnect, but let's make it rare so it doesn't annoy too much
        // const isConnected = Math.random() > 0.05;
        // Let's make it mainly connected for stability, random disconnects can be annoying.
        // But user asked for simulation. Let's keep it High availability.
        const isConnected = Math.random() > 0.1; // 90% connected

        // Keep existing situation unless it's already danger, then it stays danger until reset
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

async function schedulePushNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: null, // show immediately
  });
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    // alert('Failed to get push token for push notification!');
    console.log("Permission not granted for notifications");
    return;
  }
}
