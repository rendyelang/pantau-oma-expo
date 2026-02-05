import PantauOmaLogo from "@/assets/icons/pantauoma.png";
import { auth } from "@/lib/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext will handle redirect
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Image source={PantauOmaLogo} className="w-32 h-32 self-center mb-5" />
      <View className="items-center mb-10">
        {/* Placeholder for Logo */}

        <Text className="text-3xl font-poppins-bold text-black">Pantau Oma</Text>
        <Text className="text-gray-500 font-poppins-regular mt-2">Sign in to continue monitoring</Text>
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

      <TouchableOpacity onPress={handleLogin} disabled={loading} className={`w-full bg-orange-500 rounded-full py-4 items-center mb-6 shadow-md ${loading ? "opacity-70" : ""}`}>
        {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-poppins-bold text-lg">Sign In</Text>}
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500 font-poppins-regular">Don&apos;t have an account? </Text>
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity>
            <Text className="text-orange-500 font-poppins-bold">Register</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
