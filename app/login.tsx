import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Reanimated, { FadeIn, FadeOut } from "react-native-reanimated";
import SafePlaceLogo from "@/components/Svg/SafePlaceLogo";
import { router } from "expo-router";
import Auth from "@/service/api/auth";
import colors from "./styles/theme";
import User from "@/service/api/user";
import { DEMO_USER_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@/components/contexts/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorThrown, setIsErrorThrown] = useState(false);

  const { user, saveUser, logout } = useContext(UserContext);
  const [username, setUsername] = useState<string>(user ? user.username : "");

  const handleLogin = async () => {
    setIsErrorThrown(false);
    try {
      await Auth.login(email, password);
      const response = await User.getById(DEMO_USER_ID);
      saveUser(response);

      router.replace("/Accueil"); // Passer les paramètres dans un objet
      console.log("Email:", email, "Password:", password);
    } catch (error) {
      setIsErrorThrown(true);
      console.error("Failed to login:", error);
    }
    // Logique de connexion (à implémenter plus tard)
  };

  const handleSignUp = () => {
    // Logique pour rediriger vers la page d'inscription (à implémenter plus tard)
    console.log("Redirection vers la page d'inscription");
  };

  return (
    <View style={styles.container}>
      <SafePlaceLogo height={56} width={292} style={styles.logo} />
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAAAAA"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#AAAAAA"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isErrorThrown && (
        <Reanimated.View entering={FadeIn} exiting={FadeOut}>
          <Text style={styles.errorStyle}>Impossible de se connecter</Text>
        </Reanimated.View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.noAccount}>
        <Text>Pas de compte ? </Text>
        {/* Lien vers la page de création de compte */}
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Inscrivez-vous ici</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    padding: 20,
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  noAccount: {
    justifyContent: "center", // Centre verticalement
    alignItems: "baseline",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#171717", // Couleur noire pour le texte
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#9683EC", // Couleur primaire pour la bordure
    borderWidth: 1,
    color: "#171717",
  },
  errorStyle: {
    color: colors.red,
    fontFamily: "Helvetica-Bold",
  },
  button: {
    backgroundColor: "#9683EC", // Couleur primaire pour le bouton
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Texte en blanc
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpText: {
    color: "#9683EC", // Utiliser la couleur primaire pour le lien
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});
