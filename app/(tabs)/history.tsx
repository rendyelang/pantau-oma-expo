import { useAuth } from "@/context/AuthContext";
import { getHistory, HistoryEvent } from "@/services/database";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = async () => {
    if (user) {
      const data = await getHistory(user.uid);
      setHistory(data);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [user]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const getIcon = (type: HistoryEvent["type"]) => {
    switch (type) {
      case "DANGER":
      case "FALL":
        return <MaterialIcons name="warning" size={24} color="#ef4444" />; // red-500
      case "BATTERY":
        return <MaterialIcons name="battery-alert" size={24} color="#f97316" />; // orange-500
      case "CONNECTION":
        return <MaterialIcons name="wifi-off" size={24} color="#f97316" />; // orange-500
      case "SAFE":
        return <MaterialIcons name="check-circle" size={24} color="#22c55e" />; // green-500
      default:
        return <MaterialIcons name="info" size={24} color="#6b7280" />;
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    // Firestore timestamp to Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const renderItem = ({ item }: { item: HistoryEvent }) => (
    <View className="flex-row items-center bg-white p-4 mb-3 rounded-2xl shadow-sm border border-gray-100">
      <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${item.type === "SAFE" ? "bg-green-100" : item.type === "DANGER" || item.type === "FALL" ? "bg-red-100" : "bg-orange-100"}`}>{getIcon(item.type)}</View>
      <View className="flex-1">
        <Text className="font-poppins-bold text-gray-800 text-base">{item.title}</Text>
        <Text className="font-poppins-regular text-gray-500 text-xs mt-1">{item.description}</Text>
        <Text className="font-poppins-regular text-gray-400 text-[10px] mt-2 text-right">{formatDate(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="px-6 pt-4 pb-2">
        <Text className="font-poppins-bold text-2xl text-black">History</Text>
        <Text className="font-poppins-regular text-gray-500">Monitor critical events</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || Math.random().toString()}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20">
              <Text className="text-gray-400 font-poppins-medium">No history events yet.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
