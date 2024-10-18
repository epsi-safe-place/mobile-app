import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Définir le type pour les données utilisateur
interface User {
  username: string;
  first_name: string;
  last_name: string;
  Id_User: string; // Ajout du champ Id_User
}

// Définir le type pour le contexte
interface UserContextType {
  user: User | null;
  saveUser: (userData: User) => void;
  logout: () => void;
}

// Créer le contexte avec un type par défaut
export const UserContext = createContext<UserContextType>({
  user: null,
  saveUser: () => {},
  logout: () => {},
});

// Définir le type pour le `UserProvider` props
interface UserProviderProps {
  children: ReactNode;
}

// Créer le provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Charger l'utilisateur depuis AsyncStorage au montage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const username = `${userData.first_name}${userData.last_name}`;
          setUser({ ...userData, username, Id_User: userData.Id_User }); // Utilisation du champ Id_User
        }
      } catch (e) {
        console.log('Failed to load user data', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Fonction pour sauvegarder l'utilisateur dans le contexte et AsyncStorage
  const saveUser = async (userData: User) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user', jsonValue);
      setUser(userData);
    } catch (e) {
      console.log('Failed to save user data', e);
    }
  };

  // Fonction pour déconnecter et effacer l'utilisateur
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (e) {
      console.log('Failed to remove user data', e);
    }
  };

  if (loading) {
    return null; // Vous pouvez retourner un indicateur de chargement ici
  }

  return (
    <UserContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
