import SunIcon from "@/assets/icons/sun.svg";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export interface UserGreetingsProps {
  iconColor?: string;
  textColor?: string;
}

export function UserGreetings({ iconColor = "#FFA500", textColor = "text-primary" }: UserGreetingsProps) {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    setName("Elang");
  }, []);

  return (
    <View className="bg-white/40 backdrop-blur-sm rounded-full flex-row items-center gap-2 self-start px-3 py-2 border border-primary">
      <SunIcon width={28} height={28} color={iconColor} />
      <Text className={`${textColor} text-xs font-semibold`}>
        {greeting}, {name}
      </Text>
    </View>
  );
}
