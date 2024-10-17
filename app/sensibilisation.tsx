import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Pressable,
} from "react-native";
import globalStyles from "@/app/styles/globalStyles";
import SafePlaceLogo from "@/components/Svg/SafePlaceLogo";
import { Link } from "expo-router";
import { router } from "expo-router";
import { UserContext } from "@/components/contexts/UserContext";

const SensibilisationPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation d'opacité
  const scaleAnim = useRef(new Animated.Value(1)).current; // Animation de scale pour le bouton

  const { user, saveUser, logout } = useContext(UserContext);

  // Démarre l'animation de fade-in lorsque le composant est monté
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Durée de l'animation (1 seconde)
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Fonction pour animer le bouton lors du clic (scale)
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Réduction de la taille lors du clic
      useNativeDriver: true,
    }).start();
    if (user !== null) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Retour à la taille normale après le clic
      friction: 3,
      useNativeDriver: true,
    }).start(); // Appel de la fonction `onClose` après l'animation
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo animé avec effet de fade-in */}
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Pressable onPress={logout}>
          <SafePlaceLogo height={56} width={292} style={styles.logo} />
        </Pressable>
      </Animated.View>

      {/* Titre animé avec fade-in */}
      <Animated.Text style={{ ...styles.title, opacity: fadeAnim }}>
        Un réseau social plus sain
      </Animated.Text>

      {/* Message animé avec fade-in */}
      <Animated.Text style={{ ...styles.message, opacity: fadeAnim }}>
        Protégez votre bien-être en ligne avec des outils conçus pour réduire
        les risques d'addiction et améliorer votre expérience.
      </Animated.Text>

      {/* Bouton avec animation de scale */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Je comprends</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default SensibilisationPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    padding: 20,
    flexGrow: 1,
  },
  logoContainer: {
    marginBottom: 50, // Espace entre le logo et le texte
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#171717", // Noir pour le titre
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#171717", // Texte en noir
    marginBottom: 40, // Espace avant le bouton
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#9683EC", // Couleur primaire pour le bouton
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF", // Texte du bouton en blanc
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
