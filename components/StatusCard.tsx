import React from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";

// 1. Definisikan Tipe Data (Props) yang diterima
interface StatusCardProps {
  label: string;
  Icon: React.FC<SvgProps>; // Tipe untuk SVG Component
  variant: "danger" | "warning" | "neutral" | "success"; // Pilihan tema warna
  children?: React.ReactNode; // Buat jaga-jaga kalau mau nambahin sesuatu (kayak loading bar baterai)
}

// 2. Kamus Warna (Theme Config)
// Ini biar gampang ganti warna pusat. Gak perlu cari satu-satu di kode.
const themeStyles = {
  danger: {
    border: "border-red-400",
    iconBg: "bg-red-50",
    text: "text-red-500",
    iconColor: "#ef4444", // Tailwind Red-500 (Buat fill SVG)
  },
  neutral: {
    border: "border-amber-700", // Coklat tua
    iconBg: "bg-amber-100",
    text: "text-amber-900",
    iconColor: "#b45309", // Tailwind Amber-700
  },
  warning: {
    border: "border-orange-400",
    iconBg: "bg-orange-50",
    text: "text-orange-500",
    iconColor: "#f97316", // Tailwind Orange-500
  },
  success: {
    border: "border-green-400",
    iconBg: "bg-green-50",
    text: "text-green-600",
    iconColor: "#16a34a", // Tailwind Green-600
  },
};

export default function StatusCard({ label, Icon, variant, children }: StatusCardProps) {
  const theme = themeStyles[variant];

  return (
    <View className={`w-[48%] bg-white rounded-3xl border-2 flex justify-center items-center p-4 ${theme.border}`}>
      {/* Container Icon (Lingkaran Pudar) */}
      <View className={`w-16 h-16 rounded-full justify-center items-center mb-3 ${theme.iconBg}`}>
        <Icon width={32} height={32} color={theme.iconColor} fill={theme.iconColor} />
      </View>

      {/* Label Text */}
      <Text className={`font-poppins-medium text-center text-lg`}>{label}</Text>

      {/* Slot Tambahan (Misal: Progress Bar Baterai) */}
      {children}
    </View>
  );
}
