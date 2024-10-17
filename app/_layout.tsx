import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView, ScrollView } from "react-native";
import HomePostMessage from "@/components/HomePostMessage";
import PostView from "@/components/PostView";
import SensibilisationPage from "@/components/SensibilisationPage"; // Assurez-vous que ce chemin est correct

import { useColorScheme } from "@/hooks/useColorScheme";
import LoginPage from "@/components/LoginPage";
import SignupPage from "./screens/SignupPage";

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

  const [showSensibilisation, setShowSensibilisation] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleSensibilisationClose = () => {
    setShowSensibilisation(false); // Ferme la page de sensibilisation après interaction
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        {showSensibilisation ? (
          <SensibilisationPage onClose={handleSensibilisationClose} />
        ) : (
          <ScrollView>
            {/* Affiche les autres composants ici */}
            {/* <LoginPage></LoginPage> */}
            <SignupPage></SignupPage>
            {/* <HomePostMessage profileName="illbeanton" />
            <PostView
              profileName="illbeanton"
              postText={"Voila je tweet et je suis gentil"}
              timeAgo={"12h"}
            /> */}
          </ScrollView>
        )}
      </SafeAreaView>
    </ThemeProvider>
  );
}