import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView, ScrollView, Text } from "react-native";
import HomePostMessage from "@/components/HomePostMessage";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Helvetica: require("../assets/fonts/Helvetica.ttf"),
    "Helvetica-Bold": require("../assets/fonts/Helvetica-Bold.ttf"),
    "Helvetica-BoldOblique": require("../assets/fonts/Helvetica-BoldOblique.ttf"),
    "Helvetica-Oblique": require("../assets/fonts/Helvetica-Oblique.ttf"),
    "Helvetica-Light": require("../assets/fonts/helvetica-light-587ebe5a59211.ttf"),
    "Helvetica-Rounded-Bold": require("../assets/fonts/helvetica-rounded-bold-5871d05ead8de.otf"),
    "Helvetica-Compressed": require("../assets/fonts/helvetica-compressed-5871d14b6903a.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView>
        <ScrollView>
          {/* Insert your component here to test it! */}
          <HomePostMessage profileName="illbeanton" />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
