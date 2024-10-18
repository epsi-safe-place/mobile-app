import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import colors from "../styles/theme"; // Import the colors from the theme file
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const Settings = () => {
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] =
    useState(false);
  const [isContactSharingEnabled, setIsContactSharingEnabled] = useState(false);
  const [isAddAuthorized, setIsAddAuthorized] = useState(false);

  const toggleLocationSharing = () =>
    setIsLocationSharingEnabled((previousState) => !previousState);
  const toggleContactSharing = () =>
    setIsContactSharingEnabled((previousState) => !previousState);
  const toggleAddAuthorized = () =>
    setIsAddAuthorized((previousState) => !previousState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Entypo name="chevron-left" size={24} color="black" />
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.settingTitle}>Paramètres de partage</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Partager ma localisation</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }} // Changed to use primary color
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLocationSharing}
            value={isLocationSharingEnabled}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Partager mes coordonnées</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }} // Changed to use primary color
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleContactSharing}
            value={isContactSharingEnabled}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Autoriser la publicité</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleAddAuthorized}
            value={isAddAuthorized}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: "Helvetica",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  settingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: "#333",
  },
});

export default Settings;
