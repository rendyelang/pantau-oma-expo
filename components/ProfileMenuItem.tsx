import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
  badgeCount?: number;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, onPress, badgeCount }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View className="flex-row items-center gap-x-5">
        <View className="w-10 h-10 border-2 border-orange-400 rounded-full flex items-center justify-center relative">
          <MaterialIcons name={icon} size={22} color="#FFA500" />
          {/* menampilkan badge hanya jika badgeCount > 0 */}
          {badgeCount && badgeCount > 0 && (
            <View className="absolute bg-secondary rounded-full px-2 py-0.5 -top-2 -right-2 items-center justify-center z-10">
              <Text className="text-white text-xs font-bold">{badgeCount}</Text>
            </View>
          )}
        </View>
        <Text className="font-poppins-medium text-base text-black">{label}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={20} color="#555" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
