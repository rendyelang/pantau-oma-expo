import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ActionButtonsProps {
  onCallOma: () => void;
  onCallAmbulance: () => void;
  omaName?: string;
  ambulanceName?: string;
}

export default function ActionButtons({ onCallOma, onCallAmbulance, omaName = "Call Oma", ambulanceName = "Call Ambulance" }: ActionButtonsProps) {
  return (
    <View className="flex-row justify-between w-full px-2 mt-4 mb-6">
      {/* Call Oma */}
      <TouchableOpacity onPress={onCallOma} className="bg-white w-[30%] h-24 rounded-2xl items-center justify-center shadow-sm border-2 border-orange-100 active:bg-orange-50">
        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-2">
          <MaterialIcons name="call" size={24} color="#16a34a" />
        </View>
        <Text className="font-poppins-bold text-xs text-gray-800 text-center px-1" numberOfLines={2}>
          {omaName}
        </Text>
      </TouchableOpacity>

      {/* Call Hospital */}
      <TouchableOpacity onPress={onCallAmbulance} className="bg-white w-[30%] h-24 rounded-2xl items-center justify-center shadow-sm border-2 border-orange-100 active:bg-orange-50">
        <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mb-2">
          <FontAwesome5 name="hospital-alt" size={20} color="#dc2626" />
        </View>
        <Text className="font-poppins-bold text-xs text-gray-800 text-center px-1" numberOfLines={2}>
          {ambulanceName}
        </Text>
      </TouchableOpacity>

      {/* Navigation */}
      <TouchableOpacity className="bg-white w-[30%] h-24 rounded-2xl items-center justify-center shadow-sm border-2 border-orange-100 active:bg-orange-50">
        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mb-2">
          <FontAwesome5 name="location-arrow" size={20} color="#2563eb" />
        </View>
        <Text className="font-poppins-bold text-xs text-gray-800">Navigation</Text>
      </TouchableOpacity>
    </View>
  );
}
