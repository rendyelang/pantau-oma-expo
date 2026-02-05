import Avatar from "@/assets/images/avatar.png";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EditButton from "./ui/EditButton";

export function ProfileCard() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View className="bg-primary rounded-3xl relative h-64">
      <View className="absolute z-20 top-3 -right-3 w-full">
        <View className="bg-white rounded-3xl border border-primary px-6 py-4 relative">
          <EditButton onPress={() => router.push("/edit-profile")} />
          <View className="flex-col justify-center items-center mt-4">
            <View className="mb-4">
              <Image className="rounded-full w-32 h-32" source={Avatar} />
            </View>
            <Text className="font-poppins-bold text-2xl mb-2">{user?.displayName || "User"}</Text>
            <View className="flex-row gap-x-1">
              <TouchableOpacity onPress={() => {}}>
                <Text className="underline text-gray-500">0 Points</Text>
              </TouchableOpacity>
              <Text className="text-gray-500">| Level 1</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
