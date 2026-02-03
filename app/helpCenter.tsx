import FaqItem from "@/components/ui/FaqItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpCenter = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      question: "What is Pantau Oma and how does it work?",
      answer: "Pantau Oma is an elderly monitoring app that connects to a wearable device to track your loved one's health, location, and detect falls in real-time.",
    },
    {
      question: "Is my parents' health data private and secure?",
      answer: "Yes, we prioritize your privacy and apply end-to-end encryption to protect all health data and personal information.",
    },
    {
      question: "How do I pair the wearable device to the app?",
      answer: "Go to Settings > Setup Pairing Device, turn on Bluetooth, and follow the on-screen instructions to connect your wearable device.",
    },
    {
      question: "How does the Fall Detection feature work?",
      answer: "The wearable device uses advanced sensors to detect sudden falls. When a fall is detected, the app immediately sends a notification and alerts your emergency contacts.",
    },
    {
      question: "How do I add emergency contacts?",
      answer: "Navigate to Settings > Setup Emergency Contact, then add phone numbers of people you want to notify in case of an emergency.",
    },
    {
      question: "What should I do if the device disconnects?",
      answer: "Check if the device is charged and Bluetooth is on. If the problem persists, try re-pairing the device or contact our support team.",
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5">
        <Text className="font-poppins-bold text-2xl mt-6 mb-3">
          We're here to help you with anything and everything on <Text className="italic">Pantau Oma</Text>
        </Text>
        <Text className="font-poppins text-gray-600 mb-6 leading-6">
          At Pantau Oma, we believe peace of mind starts with a reliable connection. Whether you need help pairing the wearable device or understanding the fall detection alerts, we've got you covered. Check our frequently asked questions
          below—because their safety is our priority.
        </Text>

        {/* Search Bar */}
        <View className="relative mb-6">
          <TextInput className="border border-primary rounded-xl px-4 py-3 pr-12 font-poppins" placeholder="Search for topics..." placeholderTextColor="#999" value={searchQuery} onChangeText={setSearchQuery} />
          <Ionicons name="search" size={20} color="#999" style={{ position: "absolute", right: 16, top: 14 }} />
        </View>

        {/* FAQ Section */}
        <View className="mb-6">
          <Text className="font-poppins-bold text-lg mb-3">FAQ</Text>
          <View className="bg-white rounded-2xl border border-gray-200 px-4 py-2">
            {faqData.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </View>
        </View>

        {/* Contact Support Section */}
        <View className="items-center py-8 pb-10">
          <Text className="font-poppins-medium text-base text-gray-700 mb-4">Still have questions? We are just a message away</Text>
          <TouchableOpacity className="bg-primary rounded-full px-12 py-4 shadow-sm" onPress={() => console.log("Contact Support")}>
            <Text className="font-poppins-bold text-white text-base">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenter;
