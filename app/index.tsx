import React from "react";
import SensibilisationPage from "./sensibilisation";
import { SafeAreaView } from "react-native";

const HomePage = () => {
  return <SensibilisationPage />;
};

export const unstable_settings = {
  // Désactive le header pour cette page
  headerShown: false,
};

export default HomePage;
