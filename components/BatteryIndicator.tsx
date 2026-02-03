import React from "react";
import { View } from "react-native";

interface BatteryIndicatorProps {
  level: number;
}

export default function BatteryIndicator({ level }: BatteryIndicatorProps) {
  // Determine color based on level
  let bgColor = "bg-green-500";
  if (level <= 20) {
    bgColor = "bg-red-500";
  } else if (level <= 50) {
    bgColor = "bg-yellow-500";
  }

  return (
    <View className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
      <View className={`h-full ${bgColor}`} style={{ width: `${level}%` }} />
    </View>
  );
}
