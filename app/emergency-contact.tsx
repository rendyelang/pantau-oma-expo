import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getContacts, initDatabase, saveContact } from "../services/database";

export default function EmergencyContactScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [omaName, setOmaName] = useState("");
  const [omaPhone, setOmaPhone] = useState("");

  const [ambulanceName, setAmbulanceName] = useState("Ambulance");
  const [ambulancePhone, setAmbulancePhone] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await initDatabase();
      const contacts = await getContacts();

      const oma = contacts.find((c) => c.id === "oma");
      if (oma) {
        setOmaName(oma.name);
        setOmaPhone(oma.phone);
      }

      const ambulance = contacts.find((c) => c.id === "ambulance");
      if (ambulance) {
        setAmbulanceName(ambulance.name);
        setAmbulancePhone(ambulance.phone);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!omaName || !omaPhone || !ambulancePhone) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    setSaving(true);
    try {
      await saveContact("oma", omaName, omaPhone);
      await saveContact("ambulance", ambulanceName, ambulancePhone);
      Alert.alert("Success", "Contacts saved successfully!");
      router.back();
    } catch (e) {
      Alert.alert("Error", "Failed to save contacts");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: "Emergency Contacts", headerShadowVisible: false }} />

      <ScrollView className="flex-1 px-6 pt-4">
        <Text className="text-gray-500 mb-6 font-poppins-regular">Setup numbers to call in case of emergency.</Text>

        {/* Oma Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="person" size={24} color="#FFA500" />
            <Text className="text-lg font-poppins-bold ml-2">Contact Oma</Text>
          </View>

          <Text className="text-sm font-poppins-medium text-gray-700 mb-1">Name</Text>
          <TextInput className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular mb-4" placeholder="Oma's Name" value={omaName} onChangeText={setOmaName} />

          <Text className="text-sm font-poppins-medium text-gray-700 mb-1">Phone Number</Text>
          <TextInput className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular" placeholder="0812..." keyboardType="phone-pad" value={omaPhone} onChangeText={setOmaPhone} />
        </View>

        {/* Ambulance Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="local-hospital" size={24} color="#FF4444" />
            <Text className="text-lg font-poppins-bold ml-2">Emergency Service</Text>
          </View>

          <Text className="text-sm font-poppins-medium text-gray-700 mb-1">Service Name</Text>
          <TextInput
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular mb-4"
            value={ambulanceName}
            // Editable to allow customization (e.g. "RS Siloam")
            onChangeText={setAmbulanceName}
          />

          <Text className="text-sm font-poppins-medium text-gray-700 mb-1">Phone Number</Text>
          <TextInput className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-poppins-regular" placeholder="118 or Hospital Number" keyboardType="phone-pad" value={ambulancePhone} onChangeText={setAmbulancePhone} />
        </View>

        <TouchableOpacity onPress={handleSave} disabled={saving} className={`w-full bg-orange-500 rounded-full py-4 items-center mb-10 ${saving ? "opacity-70" : ""}`}>
          {saving ? <ActivityIndicator color="white" /> : <Text className="text-white font-poppins-bold text-base">Save Contacts</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
