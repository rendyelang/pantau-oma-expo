import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
// PERUBAHAN DISINI: Kita import langsung dari react-native
import { SimulationProvider, useSimulation } from "@/context/SimulationContext";
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useColorScheme } from "react-native";

// Mencegah splash screen hilang sebelum font siap
SplashScreen.preventAutoHideAsync();

function NavigationObserver() {
  const { situation } = useSimulation();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check if mounted/ready
    if (!segments) return;

    const inDangerRoute = segments[0] === "danger";

    if (situation === "danger" && !inDangerRoute) {
      router.replace("/danger");
    } else if (situation === "safe" && inDangerRoute) {
      router.replace("/(tabs)");
    }
  }, [situation, segments]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load Font Disini
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SimulationProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NavigationObserver />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="danger" options={{ headerShown: false, animation: "fade" }} />
          {/* <Stack.Screen name="+not-found" /> */}
        </Stack>
      </ThemeProvider>
    </SimulationProvider>
  );
}
