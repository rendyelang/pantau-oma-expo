import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-10">
      <Text className="font-poppins-bold text-2xl text-red-500">PantauOma monyetttt</Text>
      <Text className="font-poppins-medium text-gray-500 mt-2">Halaman Home (Expo Router)</Text>
    </View>
  );
}
