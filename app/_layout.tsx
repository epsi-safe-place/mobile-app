import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HomePostMessage from "@/components/HomePostMessage/HomePostMessage";
import PostView from "@/components/PostView/PostView";
import SensibilisationPage from "@/app/sensibilisation"; // Assurez-vous que ce chemin est correct

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoginPage from "./login";
import SignupScreen from "./signup";
import { Slot } from "expo-router";
import { UserProvider } from "@/components/contexts/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Helvetica: require("../assets/fonts/Helvetica/Helvetica.ttf"),
    "Helvetica-Bold": require("../assets/fonts/Helvetica/Helvetica-Bold.ttf"),
    "Helvetica-BoldOblique": require("../assets/fonts/Helvetica/Helvetica-BoldOblique.ttf"),
    "Helvetica-Oblique": require("../assets/fonts/Helvetica/Helvetica-Oblique.ttf"),
    "Helvetica-Light": require("../assets/fonts/Helvetica/helvetica-light-587ebe5a59211.ttf"),
    "Helvetica-Rounded-Bold": require("../assets/fonts/Helvetica/helvetica-rounded-bold-5871d05ead8de.otf"),
    "Helvetica-Compressed": require("../assets/fonts/Helvetica/helvetica-compressed-5871d14b6903a.otf"),
    "BricolageGrotesque-ExtraBold": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-ExtraBold.ttf"),
    "BricolageGrotesque-Bold": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-Bold.ttf"),
    "BricolageGrotesque-SemiBold": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-SemiBold.ttf"),
    "BricolageGrotesque-Medium": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-Medium.ttf"),
    "BricolageGrotesque-Regular": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-Regular.ttf"),
    "BricolageGrotesque-Light": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-Light.ttf"),
    "BricolageGrotesque-ExtraLight": require("../assets/fonts/BricolageGrotesque/BricolageGrotesque-ExtraLight.ttf"),
  });

  const [showSensibilisation, setShowSensibilisation] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const handleSensibilisationClose = () => {
  //   setShowSensibilisation(false); // Ferme la page de sensibilisation après interaction
  // };

  return (
    <GestureHandlerRootView>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
        </ThemeProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
