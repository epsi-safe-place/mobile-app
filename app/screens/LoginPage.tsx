import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SafePlaceLogo from '../../components/SafePlaceLogo';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Logique de connexion (à implémenter plus tard)
        console.log('Email:', email, 'Password:', password);
    };

    const handleSignUp = () => {
        // Logique pour rediriger vers la page d'inscription (à implémenter plus tard)
        console.log('Redirection vers la page d\'inscription');
    };

    return (
        <View style={styles.container}>
            <SafePlaceLogo style={styles.logo} />
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
        justifyContent: 'center',  // Centre verticalement
        alignItems: 'center',       // Centre horizontalement
        padding: 20,
        flexGrow: 1,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 50,
    },
    noAccount: {
        justifyContent: 'center',  // Centre verticalement
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#171717',  // Couleur noire pour le texte
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 20,
        borderColor: '#9683EC',  // Couleur primaire pour la bordure
        borderWidth: 1,
        color: '#171717',
    },
    button: {
        backgroundColor: '#9683EC',  // Couleur primaire pour le bouton
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',  // Texte en blanc
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signUpText: {
        color: '#9683EC',  // Utiliser la couleur primaire pour le lien
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
    },
});