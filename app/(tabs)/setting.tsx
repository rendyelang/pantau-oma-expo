import { ProfileCard } from "@/components/ProfileCard";
import ProfileMenuItem from "@/components/ProfileMenuItem";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function SettingScreen() {
  const router = useRouter();

  return (
    <View className="px-10 py-20">
      <Text className="text-2xl font-poppins-bold mb-7">Setting</Text>
      <ProfileCard />

      <Text className="text-xl font-poppins-bold mt-10">Menus</Text>

      <ProfileMenuItem onPress={() => {}} icon="call" label="Setup Emergency Contact" />
      <ProfileMenuItem onPress={() => {}} icon="watch" label="Setup Pairing Device" />
      <ProfileMenuItem onPress={() => {}} icon="star-outline" label="Feedback AI" />
      <ProfileMenuItem onPress={() => router.push("/helpCenter")} icon="help-outline" label="Help Center" />
      <ProfileMenuItem onPress={() => {}} icon="logout" label="Logout" />
    </View>
  );
}
