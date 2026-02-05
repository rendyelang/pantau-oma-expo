import HeroSafe from "@/assets/images/hero_safe.png";
import ActivityCard from "@/components/ActivityCard";
import BatteryIndicator from "@/components/BatteryIndicator";
// import DangerState from "@/components/DangerState";
import StatusCard from "@/components/StatusCard";
import { UserGreetings } from "@/components/UserGreetings";
// import { useDummyData } from "@/hooks/useDummyData";
import { useSimulation } from "@/context/SimulationContext";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BatteryIcon from "@/assets/icons/battery.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import WifiIcon from "@/assets/icons/wifi.svg";
import LiveMapLeaflet from "@/components/LiveMapLeaflet";

export default function HomeScreen() {
  const { bpm, activity, battery, isConnected, triggerDanger } = useSimulation();

  // Logic rendering danger sekarang dipindah ke _layout.tsx via routing

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground className="pt-14 pb-[50px] px-5" height={500} source={HeroSafe} resizeMode="cover">
          <UserGreetings />
          <View className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-primary mt-[183px]">
            <Text className="text-primary text-xl font-poppins-medium text-center">Your oma is fine</Text>
          </View>
        </ImageBackground>

        <View className="px-5">
          {/* Upper Information */}
          <View className="flex-row justify-between z-10 -top-7">
            {/* BPM */}
            <StatusCard label={`${bpm} BPM`} Icon={HeartIcon} variant="danger" />

            {/* Activity */}
            {/*
              <MaterialIcons name="chair" size={24} color="black" />
              <FontAwesome5 name="walking" size={24} color="black" />
              <MaterialCommunityIcons name="sleep" size={24} color="black" />
            */}
            <ActivityCard label={`Mom is ${activity}`} variant="success" />
          </View>

          {/* Middle Information (Map) */}
          <Text className="text-xl font-poppins-bold">Oma Live Location</Text>
          <LiveMapLeaflet />

          {/* Lower Information */}
          <Text className="text-xl font-poppins-bold">Device Status</Text>
          <View className="flex-row justify-between mt-4">
            {/* Wearable Device Battery */}
            <StatusCard label={`${battery}%`} Icon={BatteryIcon} variant="warning">
              <BatteryIndicator level={battery} />
            </StatusCard>

            {/* Connection Status */}
            <StatusCard label={isConnected ? "Connected" : "Disconnected"} Icon={WifiIcon} variant={isConnected ? "success" : "neutral"} />
          </View>

          {/* Simulation Controls */}
          <View className="mt-8 mb-8">
            <TouchableOpacity onPress={triggerDanger} className="bg-red-500 py-4 rounded-xl items-center shadow-lg active:bg-red-600">
              <Text className="text-white font-poppins-bold text-lg">⚠️ Simulate Danger</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
