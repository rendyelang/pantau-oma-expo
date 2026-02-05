import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { Stack, useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const { reloadUser } = useAuth();
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
      });
      await reloadUser(); // Refresh local user state
      Alert.alert("Success", "Profile updated successfully");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Stack.Screen options={{ title: "Edit Profile", headerBackTitle: "Back" }} />

      <View className="mb-6">
        <Text className="text-gray-700 font-poppins-medium mb-2">Display Name</Text>
        <TextInput className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular" value={name} onChangeText={setName} placeholder="Enter your name" />
      </View>

      <TouchableOpacity onPress={handleSave} disabled={loading} className={`w-full bg-orange-500 rounded-full py-4 items-center mb-6 shadow-md ${loading ? "opacity-70" : ""}`}>
        {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-poppins-bold text-lg">Save Changes</Text>}
      </TouchableOpacity>
    </View>
  );
}
