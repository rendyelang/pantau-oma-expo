import DangerIcon from "@/assets/icons/danger.svg";
import HeroDanger from "@/assets/images/hero_danger.png";
import React from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import ActionButtons from "./ActionButtons";
// import LiveMapLeaflet from "./LiveMapLeaflet";
import ActionButtons from "./ActionButtons";
import LiveMapLeaflet from "./LiveMapLeaflet";
import { UserGreetings } from "./UserGreetings";

interface DangerStateProps {
  onReset: () => void;
}

export default function DangerState({ onReset }: DangerStateProps) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="relative">
        <ImageBackground className="pt-14 pb-[250px] px-5" height={500} source={HeroDanger} resizeMode="cover">
          <UserGreetings iconColor="white" textColor="text-white" />
        </ImageBackground>

        <View className="absolute top-[220px] z-20 left-0 right-0 flex items-center justify-center">
          <View className="bg-black/25 w-44 h-44 rounded-full items-center justify-center border-2 border-white">
            <DangerIcon width={80} height={80} />
            <Text className="text-white font-poppins-bold text-3xl mt-1">DANGER</Text>
          </View>
        </View>

        {/* Content Body */}
        <View className="bg-gray-100 -mt-10 px-6 pt-24 pb-10">
          {/* Alert Message Box */}
          <View className="bg-white border-2 border-red-100 rounded-2xl p-4 mb-6 shadow-sm items-center">
            <Text className="text-red-500 font-poppins-bold text-2xl text-center">Your mom’s Fall!!</Text>
          </View>

          {/* Action Buttons */}
          <Text className="text-xl font-poppins-bold">Action Button</Text>
          <ActionButtons />

          {/* Live Location */}
          <Text className="text-xl font-poppins-bold">Oma Live Location</Text>
          <LiveMapLeaflet />

          {/* SAFE BUTTON */}
          <TouchableOpacity onPress={onReset} className="w-full bg-green-500 h-16 rounded-2xl items-center justify-center shadow-lg active:bg-green-600">
            <Text className="text-white font-poppins-bold text-xl tracking-widest stroke-red-600">MOM’S SAFE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
