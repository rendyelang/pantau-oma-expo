import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from "react-native";

// Aktifkan animasi layout di Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="border-b border-gray-200">
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7} className="flex-row justify-between items-center py-4">
        <Text className="font-poppins-medium text-base text-gray-900 flex-1">{question}</Text>
        <MaterialIcons
          name="add"
          size={24}
          color="#444"
          style={{
            transform: [{ rotate: expanded ? "45deg" : "0deg" }],
            transitionDuration: "200ms",
          }}
        />
      </TouchableOpacity>

      {expanded && (
        <View className="pb-4">
          <Text className="text-gray-600 font-poppins text-sm leading-5">{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default FaqItem;
