import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { SvgProps } from "react-native-svg";
import StatusCard from "./StatusCard";

// Adapter untuk membuat Vector Icons kompatibel dengan SvgProps yang diharapkan StatusCard
const createIconAdapter = (IconComponent: any, name: string) => {
  return ({ width, color }: SvgProps) => (
    // Menggunakan width sebagai size, dan color sebagai warna icon
    <IconComponent name={name} size={typeof width === "number" ? width : 24} color={color} />
  );
};

interface ActivityCardProps {
  label: string;
  variant?: "danger" | "warning" | "neutral" | "success";
}

export default function ActivityCard({ label, variant = "neutral" }: ActivityCardProps) {
  let Icon: React.FC<SvgProps>;

  const lowerLabel = label.toLowerCase();

  if (lowerLabel.includes("sitting") || lowerLabel.includes("duduk")) {
    Icon = createIconAdapter(MaterialIcons, "chair");
  } else if (lowerLabel.includes("walking") || lowerLabel.includes("jalan")) {
    Icon = createIconAdapter(FontAwesome5, "walking");
  } else if (lowerLabel.includes("sleeping") || lowerLabel.includes("tidur")) {
    Icon = createIconAdapter(MaterialCommunityIcons, "sleep");
  } else {
    // Default fallback icon
    Icon = createIconAdapter(MaterialIcons, "accessibility");
  }

  return <StatusCard label={label} Icon={Icon} variant={variant} />;
}
