import { auth } from "@/lib/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // AuthContext will handle redirect
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="items-center mb-10">
        <Text className="text-3xl font-poppins-bold text-black mb-2">Create Account</Text>
        <Text className="text-gray-500 font-poppins-regular text-center">Join Pantau Oma to ensure your loved ones are safe.</Text>
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 font-poppins-medium mb-2">Full Name</Text>
        <TextInput className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular" placeholder="John Doe" value={name} onChangeText={setName} />
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 font-poppins-medium mb-2">Email</Text>
        <TextInput className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular" placeholder="email@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      </View>

      <View className="mb-8">
        <Text className="text-gray-700 font-poppins-medium mb-2">Password</Text>
        <View className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between">
          <TextInput className="flex-1 font-poppins-regular" placeholder="********" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={22} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleRegister} disabled={loading} className={`w-full bg-orange-500 rounded-full py-4 items-center mb-6 shadow-md ${loading ? "opacity-70" : ""}`}>
        {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-poppins-bold text-lg">Sign Up</Text>}
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500 font-poppins-regular">Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text className="text-orange-500 font-poppins-bold">Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
