// app/styles/globalStyles.js

import { StyleSheet } from 'react-native';
import colors from './theme'; // Assurez-vous que le chemin est correct

const globalStyles = StyleSheet.create({
    text: {
        color: colors.black,
    },
    textSecondary: {
        color: colors.gray,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    // Ajoutez d'autres styles globaux si nécessaire
});

export default globalStyles;
