import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// Koordinat Awal (Misal: Nusa Putra University sukabumi, atau set bebas)
// Ganti ini sesuai lokasi yang lu mau biar keliatan real di HP lu
const INITIAL_REGION = {
  latitude: -6.919788,
  longitude: 106.925235,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export default function LiveMap() {
  // State Lokasi Oma (Awalnya sama kayak region)
  const [omaLocation, setOmaLocation] = useState({
    latitude: INITIAL_REGION.latitude,
    longitude: INITIAL_REGION.longitude,
  });

  // SIMULASI PERGERAKAN "GHOST DEVICE"
  useEffect(() => {
    const interval = setInterval(() => {
      setOmaLocation((prev) => {
        // Kita geser dikiiiit banget koordinatnya (Random)
        // Biar keliatan kayak lagi jalan kaki
        const moveLat = (Math.random() - 0.5) * 0.0002;
        const moveLng = (Math.random() - 0.5) * 0.0002;

        return {
          latitude: prev.latitude + moveLat,
          longitude: prev.longitude + moveLng,
        };
      });
    }, 2000); // Update setiap 2 detik

    return () => clearInterval(interval); // Bersihin timer pas keluar layar
  }, []);

  return (
    <View className="mt-6">
      <Text className="font-poppins-bold text-lg mb-3 text-gray-800">Mom’s Live Location</Text>

      {/* Container Map dengan Border Radius */}
      <View className="rounded-3xl overflow-hidden border-2 border-gray-100 shadow-sm h-48 bg-gray-100">
        <MapView
          provider={PROVIDER_GOOGLE} // Wajib biar smooth di Android
          style={{ width: "100%", height: "100%" }}
          initialRegion={INITIAL_REGION}
          // Biar mapnya ngikutin Oma terus (Optional, kalau mau user bebas geser, hapus baris region ini)
          region={{
            ...omaLocation,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {/* CUSTOM MARKER (Titik Biru ala Google Maps / Desain Lu) */}
          <Marker coordinate={omaLocation}>
            <View className="items-center justify-center">
              {/* Lingkaran Luar (Transparan Biru) */}
              <View className="w-16 h-16 bg-blue-500/20 rounded-full items-center justify-center border border-blue-500/30">
                {/* Lingkaran Putih Tengah */}
                <View className="w-6 h-6 bg-white rounded-full items-center justify-center shadow-md">
                  {/* Titik Biru Inti */}
                  <View className="w-4 h-4 bg-blue-600 rounded-full" />
                </View>
              </View>
              {/* Label Kecil di bawah marker (Optional) */}
              <View className="bg-white px-2 py-1 rounded-md mt-1 shadow-sm">
                <Text className="text-[10px] font-poppins-bold text-gray-600">Oma is here</Text>
              </View>
            </View>
          </Marker>
        </MapView>
      </View>
    </View>
  );
}
