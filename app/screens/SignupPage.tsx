import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SafePlaceLogo from '@/components/SafePlaceLogo';

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Champ pour confirmer le mot de passe
    const [isAdmin, setIsAdmin] = useState(false);
    const [seedTotp, setSeedTotp] = useState('');

    const handleSignup = () => {
        if (password !== confirmPassword) {
            // Alerte si le mot de passe et la confirmation ne correspondent pas
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
            return;
        }

        // Logique d'inscription (à implémenter plus tard)
        const user = {
            name,
            last_name: lastName,
            first_name: firstName,
            birth_date: birthDate,
            mail: email,
            password,
            isAdmin,
            seed_totp: seedTotp,
        };
        console.log('User data:', user);
    };

    const handleLogin = () => {
        // Logique pour rediriger vers la page de connexion (à implémenter plus tard)
        console.log('Redirection vers la page de connexion');
    };

    return (
        <View style={styles.container}>
            <SafePlaceLogo style={styles.logo} />
            <Text style={styles.title}>Créer un compte</Text>

            {/* Nom de famille */}
            <TextInput
                style={styles.input}
                placeholder="Nom de famille"
                placeholderTextColor="#AAAAAA"
                value={lastName}
                onChangeText={setLastName}
            />

            {/* Prénom */}
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                placeholderTextColor="#AAAAAA"
                value={firstName}
                onChangeText={setFirstName}
            />

            {/* Date de naissance */}
            <TextInput
                style={styles.input}
                placeholder="Date de naissance (AAAA-MM-JJ)"
                placeholderTextColor="#AAAAAA"
                value={birthDate}
                onChangeText={setBirthDate}
            />

            {/* Email */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#AAAAAA"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Mot de passe */}
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#AAAAAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Confirmation du mot de passe */}
            <TextInput
                style={styles.input}
                placeholder="Confirmez le mot de passe"
                placeholderTextColor="#AAAAAA"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {/* Bouton de création de compte */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Créer un compte</Text>
            </TouchableOpacity>

            <View style={styles.noAccount}>
                <Text>Vous avez déjà un compte ? </Text>
                {/* Lien vers la page de connexion */}
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.signUpText}>Connectez-vous ici</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupScreen;

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
    signUpText: {
        color: '#9683EC',  // Utiliser la couleur primaire pour le lien
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        borderColor: '#9683EC',
        borderWidth: 1,
        color: '#171717',
    },
    button: {
        backgroundColor: '#9683EC',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    noAccount: {
        justifyContent: 'center',  // Centre verticalement
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});