import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function LiveMapLeaflet() {
  const webViewRef = useRef<WebView>(null);

  // Koordinat Awal (Misal: Nusa Putra)
  const [omaLocation, setOmaLocation] = useState({
    lat: -6.9051363,
    lng: 106.8708855,
  });

  // HTML + CSS + JS Leaflet (Semua dalam satu string)
  // Kita pake CDN Leaflet yang gratis
  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
          /* Custom Marker Style (Titik Biru ala Google) */
          .custom-marker {
            background-color: #2563eb; /* Blue-600 */
            border: 3px solid #ffffff;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.3); /* Effect Radar Biru Muda */
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // 1. Inisialisasi Map
          const map = L.map('map', { zoomControl: false }).setView([${omaLocation.lat}, ${omaLocation.lng}], 16);

          // 2. Pasang Tile Layer (Pake OpenStreetMap - GRATIS)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // 3. Bikin Custom Icon Marker
          const customIcon = L.divIcon({
            className: 'custom-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10] // Biar titiknya pas di tengah
          });

          // 4. Taruh Marker Awal
          const marker = L.marker([${omaLocation.lat}, ${omaLocation.lng}], { icon: customIcon }).addTo(map);

          // 5. Fungsi Update Posisi (Dipanggil dari React Native)
          // Ini jembatan komunikasi
          window.updateMarker = function(lat, lng) {
            const newLatLng = new L.LatLng(lat, lng);
            marker.setLatLng(newLatLng);
            map.panTo(newLatLng); // Kamera ikutin marker
          }
        </script>
      </body>
    </html>
  `;

  // Simulasi Pergerakan (Ghost Walk)
  useEffect(() => {
    const interval = setInterval(() => {
      setOmaLocation((prev) => {
        const newLat = prev.lat + (Math.random() - 0.5) * 0.0005;
        const newLng = prev.lng + (Math.random() - 0.5) * 0.0005;

        // Kirim perintah update ke WebView (JavaScript Injection)
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(`
            window.updateMarker(${newLat}, ${newLng});
            true; // Wajib return true
          `);
        }

        return { lat: newLat, lng: newLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mt-6 mb-8">
      {/* <Text className="font-poppins-bold text-lg mb-3 text-gray-800">Mom’s Live Location (Leaflet)</Text> */}

      <View className="rounded-3xl overflow-hidden border-2 border-gray-100 shadow-sm h-56 bg-gray-100 relative">
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: leafletHTML }}
          style={{ width: "100%", height: "100%" }}
          scrollEnabled={false} // Biar map gak konflik sama scroll halaman utama
        />

        {/* Label Overlay (Biar tetep berasa native) */}
        {/* <View className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
          <Text className="text-xs font-poppins-bold text-gray-600">Oma is walking...</Text>
        </View> */}
      </View>
    </View>
  );
}
